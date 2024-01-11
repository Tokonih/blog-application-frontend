import { Link } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import "../styles/Post.css";
import profileImage from "../assets/images/profile  image.jpg";
import contentImage from "../assets/images/content-image.jpg";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
import StaffpicksImage from "../assets/images/profile  image.jpg";

export default function Post() {
  const [post, setPost] = useState();
  const [category, setcategory] = useState()

  useEffect(() => {
    fetch(`http://localhost:9000/api/v1/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9000/api/v1/category`)
      .then((res) => res.json())
      .then((data) => {
        setcategory(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }, []);

  return (
    <>
      {/* <div className="post-container"> */}
      {post ? (
        <>
          <div className="profile-content">
            <div className="profile-content-left">
              <div className="profile-name-and-posts">
                <div className="post-to-single-post">
                  <div>
                    {post &&
                      post.map((data) => (
                        <Link
                          to={`/post/${data.category_id}/${data._id}`}
                          className="post-content"
                        >
                          <div className="name-and-time">
                            <figure>
                            <img src={"http://localhost:9000/images/" +data.img} alt="" />
                              {/* <img src="" alt="" /> */}
                            </figure>
                            <p>{data.user_id.fullname} • {data.created_at.slice(0,10)}</p>
                          </div>

                          <div className="post-contain">
                            <div className="post-title-and-body">
                              <h3>{data.title}</h3>
                              <header>
                                <h4>{data.body.slice(0, 200)}...</h4>
                              </header>
                            </div>
                            <figure>
                              <img src={"http://localhost:9000/images/" +data.img} alt="" />
                            </figure>
                          </div>

                          <div className="post-categories">
                            <div className="post-categories-content">
                              <p>{data.category_id.name}</p>
                              <p>8 min read</p>
                            </div>
                            <div className="post-icon-container">
                              <CiBookmark className="post-icon" />
                              <IoIosRemoveCircleOutline className="post-icon" />
                              <SlOptions className="post-icon" />
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="home-page-right">
              <h4> Staff picks</h4>
              <div>
                <div className="Staff-picks-container">
                  <div className="Staff-picks">
                    <figure>
                      <img src={StaffpicksImage} alt="" />
                    </figure>
                    <h6>Jackie </h6>
                  </div>
                  <h4>How i got into and managed to work away from burnt</h4>
                  <h6>see the full list</h6>
                </div>

                <div className="recommended-topic">
                  <h3>Recommended Topic</h3>
                    {
                        category && category.map((data)=>(
                            <div className="recommended-topic-btn">

                            <button>{data.name} </button>
                  </div>
                        ))
                    }
                  <p>see the full list</p>
                </div>

                <div className="who-to-follow-container">
                  <h4>Who to follow </h4>
                  <div  className="who-to-follow">
                    <div className="who-to-follow-image-and-name">
                      <figure>
                        <img src={StaffpicksImage} alt="" />
                      </figure>
                      <h3>Alex</h3>
                    </div>
                    <button>Follow</button>
                  </div>
                  <p>see the full list</p>
                </div>

                <div className="read-list-container">
                  <h4>Read list</h4>
                  <p>
                    Click the on any story to easily add it to your reading list
                    or a custom list that you can share.
                  </p>
                  <p>
                    Help Status About Careers Blog Privacy Terms Text to speech
                    Teams
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="loading">
            <Loader />
          </div>
        </>
      )}

      {/* </div> */}
    </>
  );
}

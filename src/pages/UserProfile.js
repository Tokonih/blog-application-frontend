import { useEffect, useState } from "react";
import Navigation from "../common/Nav";
import Post from "../components/Post";
import UserProfileContent from "../components/UserProfileContent";
import "../styles/ProfilePage.css";
import { Link, useParams } from "react-router-dom";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";
// import Loader from "./Loader";

export default function UserProfile() {
  // let getId = JSON.parse(localStorage.getItem("blogUserProfile"))
  // console.log(getId)
  // let UserId = getId.fullname
  // let nameAbb = getId.fullname.slice(0, 1).toUpperCase()]
  const [post, setPost] = useState([]);
  const [userName, setUserName]  = useState('')

  let { userId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:9000/api/v1/user/${userId}/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);


       data.forEach((user) => {
        setUserName(user.user_id.fullname)
       })

      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }, []);

  return (
    <div>
    <Navigation/>
    <div className="profile-content">
    

         <div className="profile-content-left">
            
             <div  className="profile-name-and-posts"> 

             <div className="profile-name"> 
                 <h2>{userName}</h2>
             </div>
             <div>
             <div className="post-to-single-post">

<div>
  {
    post && post.map((data)=>(
<>
<div className="name-and-time">
    <figure>
    <img src={'http://localhost:9000/images/' + data.img} alt="" />
    </figure>
    <p>{data.user_id.fullname} • {data.created_at.slice(0,10)} </p>
</div>

<div className="post-contain">
   
    <div className="post-title-and-body">
        
        <h3>{data.title}</h3>
        <header>

        <h4>{data.body.slice(0, 200)}...</h4>
        </header>

    </div>
    <figure>
        <img src={'http://localhost:9000/images/' + data.img} alt="" />
    </figure>
</div>


<div className="post-categories">
    <div className="post-categories-content">
        <p>{data.category_id.name}</p>
        <p>8 min read</p>
    </div>
    <div className="post-icon-container">
        <CiBookmark className="post-icon"/>
        <IoIosRemoveCircleOutline className="post-icon"/>
           <SlOptions className="post-icon"  />   
              
    </div>
</div>
</>
    ))
  }
</div>
</div>
              </div>
             </div>
         </div>
         <div  className="profile-content-right">
             <div className="right-profile-name">
             <h1>{userName.slice(0,1)}</h1>
             </div>

             <h5>{userName}</h5>

             <h5 className="profile-content-right-edit-name ">Edit Profile</h5>
         </div>
     </div>
 </div>


  );
}

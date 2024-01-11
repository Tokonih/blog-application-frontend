import { Link, json, useParams } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import "../styles/Post.css"
import profileImage from "../assets/images/profile  image.jpg"
import contentImage from "../assets/images/content-image.jpg"
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
// const Backend = 


export default function ProfileContent(){
    // const {id }= useParams()
    const [post, setPost]= useState([])
    const [category, setcategory] = useState({})
    const [profileName , setProfileName] = useState({})
    const [comment , setComment] = useState([])
    let getId = JSON.parse(localStorage.getItem("blogUserProfile"))
    // console.log(getId)
    let UserId = getId._id
    console.log(UserId)
    useEffect(()=>{
        fetch(`http://localhost:9000/api/v1/posts`)
        .then((res) => res.json())
        .then((data) =>{
            // setPost(data)
            const getPost = data.filter((userPost) => userPost.user_id._id === UserId)
            if(getPost){
                setPost(getPost)
                console.log(post)
                console.log(getPost)
            }else {
                alert("No post yet")
            }
            // console.log(data)
        })  
        .catch((err)=> {
            console.log(err.messsage)
        })
    },[])


    const removePostFromState = (postId) => {
        setPost((prevPost) => prevPost.filter((posts)=> posts._id !== postId))
    }


    const deletePost = (id) => {
        if(window.confirm("Do you want to delete this post ? ")){

            fetch(`http://localhost:9000/api/v1/posts/${id}`,{
                method:"Delete",
                headers:{"Content-Type" : "Application/json"},
            })
            .then((res)=>{
                if(res.ok){
                    alert(" Post Deleted ")
                    removePostFromState(id)
                }else{
                    alert("Failed to delete post")
                }
                
            }).catch((err)=> {
                console.log(err.messsage)
            })
        }
    }

    return(
<>
<div className="profile-content-container">
        {
            post.length ? (
                post.map((data)=> (
                    <div className="post-to-single-post">

            <div className="name-and-time">
                <figure>
                <img src={profileImage} alt="" />
                </figure>
                <p>{data.user_id.fullname} • {data.created_at.slice(0,10)}</p>
            </div>

            <Link to={`/post/${data.category_id.name}/${data._id}`} className="post-contain">
               
                <div className="post-title-and-body">
                    
                    <h3>{data.title}</h3>
                    <header>

                    <h4>{data.body.slice(0, 300)}...</h4>
                    </header>

                </div>
                <figure>
                    <img src={"http://localhost:9000/images/" + data.img} alt="" />
                </figure>
            </Link>
           

            <div className="post-categories">
                <div className="post-categories-content">
                    <p>{data.category_id.name}</p>
                    <p>8 min read</p>
                </div>
                <div className="post-icon-container">
                    <CiBookmark className="post-icon"/>
                    <IoIosRemoveCircleOutline className="post-icon" onClick={()=> deletePost(data._id)}/>
                       <SlOptions className="post-icon"  />   
                          
                </div>
            </div>
            </div>
                ))
            ) : (<>
                  <div className="loading">
                 <Loader/>
                  </div>
                </> )
        }
        
       
        
              
        </div>
</>
    )
}
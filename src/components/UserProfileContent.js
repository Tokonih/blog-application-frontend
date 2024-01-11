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


export default function UserProfileContent(){
    // const {id }= useParams()
    const [post, setPost]= useState([])
    const [category, setcategory] = useState({})
    const [profileName , setProfileName] = useState({})
    const [comment , setComment] = useState([])
    let getId = JSON.parse(localStorage.getItem("blogUserProfileId"))
    // console.log(getId)
    // let UserId = getId._id
    // console.log(UserId)
    let {userId} = useParams()
    useEffect(()=>{
        fetch(`http://localhost:9000/api/v1/user/${userId}/posts`)
        .then((res) => res.json())
        .then((data) =>{
          console.log(data)
        })  
        .catch((err)=> {
            console.log(err.messsage)
        })
    },[])


   

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
                <p>{data.user_id.fullname} • {profileName.created_at}</p>
            </div>

            <Link to={`/post/${data.category_id.name}/${data._id}`} className="post-contain">
               
                <div className="post-title-and-body">
                    
                    <h3>{data.title}</h3>
                    <header>

                    <h4>{data.body}...</h4>
                    </header>

                </div>
                <figure>
                    <img src={data.img} alt="" />
                </figure>
            </Link>
           

            <div className="post-categories">
                <div className="post-categories-content">
                    <p>{data.category_id.name}</p>
                    <p>8 min read</p>
                </div>
                <div className="post-icon-container">
                    <CiBookmark className="post-icon"/>
                    <IoIosRemoveCircleOutline className="post-icon" />
                       <SlOptions className="post-icon"  />   
                          
                </div>
            </div>
            </div>
                ))
            ) : (<>
                  <div className="loading">
                   <h2>Loading...</h2>
                  </div>
                </> )
        }
        
       
        
              
        </div>
</>
    )
}
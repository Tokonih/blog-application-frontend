import "../styles/SinglePost.css"
import { PiHandsClappingBold, PiHandsClappingThin } from "react-icons/pi";
import { LiaCommentAlt } from "react-icons/lia";
import { CiBookmark } from "react-icons/ci";
import { LiaPlayCircleSolid } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { RxShare2 } from "react-icons/rx";
import userImage from "../../src/assets/images/1_Lq2ZgtY22GeUUszGDrWAFQ.jpg"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { GrBold } from "react-icons/gr";
import { BsChevronDown, BsTypeItalic } from "react-icons/bs";
import commentImage from "../assets/images/1_Lq2ZgtY22GeUUszGDrWAFQ.jpg"
import Loader from "./Loader";
export default function SinglePostBody(){
    const [shareComment, setShareComment]= useState()
    const [singlePost, setSinglePost]=useState({})
    const [category, setcategory] = useState({})
    const [profileName , setProfileName] = useState({})
    const [comment , setComment] = useState([])
    const [like , setLike] = useState([])
    const [likeIcon , setLikeIcon] = useState(false)
    const [err, setErr]= useState(false)
    const { id } = useParams()
    const [commenrBar, setCommentBar]= useState(false)


    useEffect(()=>{
        fetch(`http://localhost:9000/api/v1/posts/${id}`)
        .then((res)=> res.json())
        .then((data)=>{
            setSinglePost(data)
            console.log(data.img)
            // console.log(data.user_id._id)
            let userId = data.user_id._id
            console.log(userId)
            localStorage.setItem("blogUserProfileId",userId)
            // console.log(singlePost)
             setcategory({category, ...data.category_id})
             setProfileName({profileName, ...data.user_id})
             setComment([comment, ...data.comment_id])
             setLike([like, ...data.like_id])
             console.log(comment)
            // console.log(singlePost)
        })
        .catch((err)=> console.log(err.message))
    }, [])

    const openHandleSideBar = () => {
        setCommentBar(true)
    }

    const closeHandleSideBar = () => {
        setCommentBar(false)
    }
  

    const userProfile = JSON.parse(localStorage.getItem("blogUserProfile"));
    const userID = userProfile._id
    // console.log(userID)

    const postComment = (e) => {
        e.preventDefault()

        if (shareComment === undefined){
            setErr(true)
            alert('Type a comment')
            return
        }
     
        const commentDetail = {
                post_id: id,
                user_id: userID,
                comment:shareComment
        }
        // console.log(commentDetail)
    
        fetch('http://localhost:9000/api/v1/comment',{
            method:'POST',
            headers:{'Content-Type': 'Application/json'},
            body: JSON.stringify(commentDetail)
        })
        .then((res)=> {
            // console.log(res)
            // alert('you just made a comment')
            setComment([...comment, commentDetail])
            setShareComment('')
        })
        .catch((err)=> console.log(err.message))

     
    }



    const postLike = (e) => {
        e.preventDefault()


        const isLiked = like.some((likeItem)=> likeItem.user_id === userID  && likeItem.post_id === id);

        if(isLiked){
            fetch('http://localhost:9000/api/v1/unlike', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ user_id: userID, post_id: id }),
        })
            .then((res) => {
                console.log(res);
                // alert('You unliked this content');
                // Remove the like from the state
                setLike(like.filter((likeItem) => !(likeItem.user_id === userID && likeItem.post_id === id)));
                setLikeIcon(false)
            })
            .catch((err) => console.log(err.message));
        }else{

                const likeDetail = {
                    user_id: userID,
                    post_id: id,
                    like:true
                 }
                 console.log(likeDetail)
        
        
                fetch('http://localhost:9000/api/v1/like',{
                    method:'POST',
                    headers:{'Content-Type': 'Application/json'},
                    body: JSON.stringify(likeDetail)
                })
                .then((res)=> {
                    console.log(res)
                    // alert('you just made a Liked this content')
                    setLike([...like, likeDetail])
                    setLikeIcon(true)
                    
                })
                .catch((err)=> console.log(err.message))
            }
        }
    
    return(
        <div>
            {
                comment.length? (
                    <div className="single-post">

            
                    { singlePost && (
                        
                        <>
                        <p className="single-post-star">⭐{category.name}</p>
                    <h3 className="single-post-header">{singlePost.title} </h3>
                    <Link to={`/${profileName._id}/post`} className="creator-detail">
                        <figure>
                            <img src={userImage} alt="" />
                        </figure>
                        <div className="creator-detail-name-and-details">
                            <h4>{profileName.fullname} • <span>Follow</span></h4>
                            <p>{category.name} • 4 min read • may 9</p>
                        </div>
                    </Link>
            
                    <div className="likes-and-comment-container">
                        <div className="for-likes-and-comment">
                            <button className="likes-and-value">  
                            
                            {likeIcon ? (
    <PiHandsClappingBold className="post-icon" onClick={postLike} />
  ) : (
    <PiHandsClappingThin className="post-icon" onClick={postLike} />
  )}
  <p>{like.length - 1}</p>

                            </button>
                            <button className="likes-and-value" ><LiaCommentAlt className="post-icon" onClick={openHandleSideBar}/>  <p>{comment.length-1}</p></button>
                        </div>
                        <div className="save-and-share">
                            <CiBookmark className="post-icon"/>
                            {/* <LiaPlayCircleSolid className=""/> */}
                            <RxShare2 className="post-icon"/>
                            <SlOptions className="post-icon"/>
                        </div>
                    </div>
            
                    <div className="single-post-content">
                        <figure>
                            <img src={"http://localhost:9000/images/" + singlePost.img} alt="" />
                        </figure>
                        <header>
                            <h3>{singlePost.body}</h3>
                        </header>
                    </div>
                    </>
            
                    )
                    }
                    
            
            
            
                     </div>
                ) : (
                    <>
                    <div className="loading">
                    <Loader/>
                   </div>
                    </>
                )
            }
       

        {commenrBar && (
    <div className={`comment-section-container ${commenrBar ? "opened" : ""}`}>

        <div  className="comment-section">

     
        <div className="comment-responses-count">
            <h3>Response ({comment.length-1})</h3>

            <div>
                <IoCloseOutline onClick={closeHandleSideBar}/>
            </div>
        </div>

        <div className="post-comment">
            <form action="" onSubmit={postComment}>
            <div  className="profile-name-and-image">
            <figure><img src={commentImage} alt="" /></figure>

                <h4>{profileName.fullname}</h4>
            </div>
            <textarea onChange={(e)=>setShareComment(e.target.value)} value={shareComment} name="" id="" cols="30" rows="10" placeholder="What are your thoughts?"></textarea>
            {err === shareComment && shareComment === "" ? (
                <span>Enter Comment</span>
              ) : (
                shareComment === null
              )}
            <div className="submit-comment">
                <div className="bold-and-italic"><GrBold/> <BsTypeItalic/></div>
                <div className="submit-comment-right">
                    <p>Cancel</p>
                    <button>Respond</button>
                </div>
            </div>
            <div className="comment-checkbox">
                <input type="checkbox" />
                <label htmlFor="">Also publish to my profile</label>
            </div>
            </form>
        </div>
        
        <div className="most-relevant-comment">
            <h4>Most Relevant</h4>
            <BsChevronDown/>
        </div>

        <div>
                {comment.length > 0 && comment.map((data, index)=>(
                    <>
            <div key={index} className="commentator-name-and-image-container">
                <div className="commentator-name-and-image">
                    {/* <figure><img src={commentImage} alt="" /></figure> */}
                    {/* <div  className="comment-body">
                        <p>commentor name</p>
                        <p>comment date</p>
                    </div> */}
                </div>
                {/* <SlOptions/> */}
            </div>

            <div className="comment-body">
                <p>{data.comment}</p>
            </div>
            </>
                ))}
        </div>
        </div>
    </div>
        )}
    </div>
    )
}
import Navigation from "../common/Nav";
import Post from "../components/Post";
import ProfileContent from "../components/ProfileContent";
import "../styles/ProfilePage.css"


export default function ProfilePage(){
    let getId = JSON.parse(localStorage.getItem("blogUserProfile"))
    // console.log(getId)
    let UserId = getId.fullname
    let nameAbb = getId.fullname.slice(0, 1).toUpperCase()
    return(


        <div>
           <Navigation/>
           <div className="profile-content">
           

                <div className="profile-content-left">
                    <div  className="profile-name-and-posts"> 

                    <div className="profile-name"> 
                        <h2>{UserId}</h2>
                    </div>
                    <div>
                        <ProfileContent/>
                         {/* <Post/> */}
                     </div>
                    </div>
                </div>
                <div  className="profile-content-right">
                    <div className="right-profile-name">
                    <h1>{nameAbb}</h1>
                    </div>

                    <h5>{UserId}</h5>

                    <h5 className="profile-content-right-edit-name ">Edit Profile</h5>
                </div>
            </div>
        </div>
    )
}
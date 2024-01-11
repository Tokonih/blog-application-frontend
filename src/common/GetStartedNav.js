import Post from "../components/Post";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { FcBusinessman } from "react-icons/fc";
import "../styles/GetStarted.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
export default function GetStartedNav(){
    const [isModalOpen, setisModalOpen] = useState(false)
    const [signInOpen, setSignInOpen] = useState(false)
    const openModal=() =>{
        setisModalOpen(true)
    }

    const closeModal= ()=> {
        setisModalOpen(false)
    }

    const openSignIn = () => {
        setSignInOpen(true) 
    }

    const closeSignIn = () => {
        setSignInOpen(false)
    }

    return(
             <div className="get-started-navigation-container">
                {isModalOpen && (
                    <SignUp handleClick={closeModal}/>
                )}
                 {signInOpen && (
                    <SignIn handleClick={closeSignIn}/>
                )}
                <div className="get-started-navigation">
                <div className="get-started-left-nav">
               
                <header>
                    <h1>
                    Tk
                    </h1>
                </header>
               
            </div>
            <div className="get-started-right-nav">
               <Link>Our Story</Link>
               <Link>Membership</Link>
               <Link>Write</Link>
               <button onClick={openSignIn} className="get-started-sign-in">Sign In</button>
               <button onClick={openModal} className="get-started-sign-up">Get Started</button>
            </div>
                </div>

        </div>
    )
}
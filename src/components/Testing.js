import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { FcBusinessman } from "react-icons/fc";
import "../styles/Write.css"
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";

export default function Testing(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [title, setTitle] = useState()
    const [story, setStory] = useState()
    const [image, setImage] = useState(null)
    const [err, setErr] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories]=useState([])
    const [userId, setUserId] = useState()
    const navigate = useNavigate()

   
    // let blogUserProfileId = localStorage.getItem("blogUserProfile")
    // // console.log(blogUserProfileId)
  
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleCheckboxClick = (event) => {
      // Prevent the click event from propagating to the dropdown container
      event.stopPropagation();
    };
    
    // Add a separate click handler for the select options
    const handleSelectOptionClick = () => {
      setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        document.addEventListener("click", closeDropdown);
    
        return () => {
          document.removeEventListener("click", closeDropdown);
        };
      }, []);

      const blogUserProfile = JSON.parse(localStorage.getItem('blogUserProfile'))

      localStorage.getItem("blogUserProfile")

      useEffect(()=>{
          fetch("http://localhost:9000/api/v1/category")
          .then((res)=> res.json())
          .then((data)=> {
            setCategories(data)
          })
          .catch((err)=> err.message)
      },[])

      const handleCheckedboxChange = (e) => {
        const categoryId = e.target.value;
        const  isChecked = e.target.value;

        // let updatedSelectedCategories = [...selectedCategories];

        if(isChecked){
            setSelectedCategories([...selectedCategories, categoryId])
            localStorage.setItem("selectedCategories", categoryId)
            // updatedSelectedCategories.push(categoryId);

        }else{
            setSelectedCategories(
                selectedCategories.filter((id) => id !== categoryId)
              );
        }
      }

    

      let selectedCategoriesÏd = localStorage.getItem("selectedCategories")
  
      const userProfile = JSON.parse(localStorage.getItem("blogUserProfile"));
      const userID = userProfile._id

   



      const handlePost = async (e)=>{
        e.preventDefault()
        
        if(title ==="" || story ==="" || image === "" || selectedCategoriesÏd === ""){
            alert("enter content")
            setErr(true)
            return
        }

        // const postDetails = {
        //     category_id: selectedCategoriesÏd,
        //     user_id: userID,
        //     title:title,
        //     body:story,
        //     img :image
        // }
        //  console.log(postDetails)

         const formData = new FormData();
         formData.append("category_id", selectedCategoriesÏd);
         formData.append("user_id", userID);
         formData.append("title", title);
         formData.append("body", story);
         formData.append("img", image);
        // console.log(formData)
        //  if(image){
        //   formData.append("img", image)
        //  }
  
         try {
          const response = await fetch("http://localhost:9000/api/v1/posts", {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            alert("Post Successful");
            // Optionally, you can reset the form fields here:
            setStory('')
            setTitle('')
            setImage(null)           
            navigate('/home') 
          } else {
            alert("Error creating post");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
  
    
    return(
        <form onSubmit={handlePost}>
         <div className="write-container">
            <div className="write-left-nav">
                <Link className="write-logo" to='/home'>
                <svg viewBox="0 0 1043.63 592.71" class="q r"><g data-name="Layer 2"><g data-name="Layer 1"><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path></g></g></svg>

                </Link>
            </div>
            <div className="write-right-nav">
                {/* <input type="submit" /> */}
                <button className="publish-content" >Publish</button>
                <div>
                <SlOptions onClick={handleSelectOptionClick}
            ref={dropdownRef} /> 
                </div>
                <figure>
                    <img src={<FcBusinessman/>} alt="" />
                </figure>
            </div>
        </div>

        <div className="write-content">
            <div className="write-title">
                <textarea name="" id="" cols="30" rows="10"  placeholder="Title"  onChange={(e)=> setTitle(e.target.value)} value={title}></textarea>
                {/* <input type="text"/> */}
            </div>
                <div>
                    {err === title && title === "" ? (
                <span>Enter Title</span>
              ) : (
                title === null
              )}
                    </div>
            <div className="write-text">
            <textarea name="" id="" cols="30" rows="10" placeholder="Type your story"  onChange={(e)=> setStory(e.target.value)} value={story} ></textarea>

                {/* <input type="text" placeholder="Tell your story..." /> */}
            </div>
            <div>
                    {err === story && story === "" ? (
                <span>Enter Story</span>
              ) : (
                story === null
              )}
            </div>

            <div className="write-text">
            {/* <textarea name="" id="" cols="30" rows="10" placeholder="Input image"  onChange={(e)=> setImage(e.target.value)} value={image} ></textarea> */}

                <input type="file" name="img" placeholder="Tell your story..."  onChange={(e)=> setImage(e.target.files[0])}/>
            </div>

            <div>
                    {err === image && image === "" ? (
                <span>Enter Image</span>
              ) : (
                image === null
              )}
            </div>
        </div>


        <div>
          {
              dropdownOpen &&(
            <>
            <div className="popup-for-rate" onClick={handleCheckboxClick}>

                {
                    categories.map((category)=>(

                        <div key={category._id} className="checkbox-and-price ">
                        <input type="checkbox"
                              value={category._id}
                              checked={selectedCategories.includes(category._id)}
                              onChange={handleCheckedboxChange}
                        />
                        <label>{category.name}</label>
                        </div>
                    ))
                }
          
            </div>
            
          </>
            )
          }
        </div>
        </form>
    )
}
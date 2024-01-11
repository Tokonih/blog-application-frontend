import { useState } from "react";
import "../../src/styles/SignUp.css";

import { IoCloseOutline } from "react-icons/io5";
import { json, useNavigate } from "react-router-dom";

export default function SignIn(props) {
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState(false);
  const Navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("pls fill the inputs ");
      setErr(true);
      return;
    }

    const signin = {
      // name: fullname,
      // phone: phone,
      email: email,
      password: password,
    };

    fetch("http://localhost:9000/api/v1/users")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const getuser = data.find(
          (user) => user.email === email && user.password === password
        );

        if (getuser) {
          alert("Login successful");
          localStorage.setItem("blogUserProfile", JSON.stringify(getuser));
          console.log(getuser);
          Navigate("/home");
        } else {
          alert("invalid user detail");
        }
        // alert("user created");
        // console.log(data)
      })
      .catch((err) => console.log(err.message));

    // setFullName("")
    setEmail("");
    // setPhone("")
    setPassword("");
  };
  return (
    <div className="signup-modal-container">
      <div className="signup-modal-content">
        <div className="close-modal-icon">
          <IoCloseOutline
            className="close-modal-btn"
            onClick={props.handleClick}
          />
        </div>

        <div className="join-medium">
          <header>
            <h3>Join Meduim.</h3>
          </header>

          <div className="signup-with">
            <form action="" onSubmit={handleSignUp}>
              <div className="sign-up-with">
                {/* <label htmlFor="">Email</label> */}
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email "
                />
              </div>
              <div>
                {err === true && email === "" ? (
                  <span>Enter emaill</span>
                ) : (
                  email === null
                )}
              </div>

              <div className="sign-up-with">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password "
                />
              </div>

              {err === password && password === "" ? (
                <span>Enter password</span>
              ) : (
                password === null
              )}
              <button>Sign in</button>
            </form>
          </div>
          {/* <p>Already having an account? <span className="already-have-acct-link">Sign in</span></p> */}

          <h6>
            Click “Sign Up” to agree to Medium’s Terms of Service and
            acknowledge that Medium’s Privacy Policy applies to you
          </h6>
        </div>
      </div>
    </div>
  );
}

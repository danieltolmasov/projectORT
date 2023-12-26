import "bootstrap/dist/css/bootstrap.min.css";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../data/UserContext";
import { signIn, signUp } from "../firebase/auth";
import { db } from "../firebase/firebase";
import { addLawyer, getLawyers } from "../firebase/lawyers";
import "../style/SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)
  const adminEmail = "admin@example.com";
const adminPassword = "admin1234"; 
async function adminSignIn() {
  const emailInput = prompt("הזן כתובת דוא\"ל:");
  const passwordInput = prompt("הזן סיסמה:");
  if (emailInput === adminEmail && passwordInput === adminPassword) {
    navigate("/admin");
  } else {
    alert("כתובת הדוא\"ל או הסיסמה אינם נכונים.");
   
  }


}

console.log("gghhgg");

  async function onSubmit(event) {

    event.preventDefault();

    let user;
    if (authMode === "signin") {
      user = await signIn(email, password);
    }
    if (authMode == "signup") {
      user = await signUp(email, password);
    }

    setUser(user)
 
    if(user)
    navigate("/")
  else
  {
    alert("error")
  }


  }

  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">התחברות</h3>
            <div className="text-center">
  <span className="link-primary" onClick={changeAuthMode}>
    {authMode === "signin" ? "הרשמה" : "התחברות"} |{" "}
  </span>
  <span className="link-primary" onClick={adminSignIn}>
    התחברות כאדמין
  </span>
</div>
            <div className="form-group mt-3">
              <label>כתובת דוא"ל</label>
              <input
                type="email"
               
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>סיסמה</label>
              <input
                type="password"
               
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                התחברות
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">הרשמה</h3>
          <div dir="rtl" className="text-center">
          כבר רשום?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
                להתחברות
            </span>
          </div>
          <div className="form-group mt-3">
            <label>שם מלא</label>
            <input
              type="text"
           
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>כתובת דוא"ל</label>
            <input
              type="email"
             
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>סיסמה</label>
            <input
              type="password"
             
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event)=>onSubmit(event)}
            >
             הירשם
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

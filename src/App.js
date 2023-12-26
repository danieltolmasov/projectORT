import logo from "./logo.svg";
import "./App.css";
import SignUp from "./components/SignUp";
import Lawyers from "./components/Lawyers";
import Information from "./components/Information";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import InfoLawyers from "./components/InfoLawyers";
import AddLawyer from "./components/AddLawyer";
import Questions from "./components/Questions";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";
import UserContxt from "./data/UserContext";
import { auth } from "./../src/firebase/firebase"
import Admin from "./components/Admin";
function App() {
  const [user, setUser] = useState(null);
console.log(auth.currentUser);
  return (
    <div className="App">
      <UserContxt.Provider value={{user, setUser}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Information" element={<Information />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AddLawyer" element={<AddLawyer />} />
          <Route path="/Lawyers" element={<Lawyers />} />
          <Route path="/Questions" element={<Questions />} />
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="/lawyers/:id" element={<InfoLawyers/>} />
        </Routes>
      </UserContxt.Provider>
    </div>
  );
}

export default App;

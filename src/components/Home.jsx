import React from "react";
import Header from "./Header";
import imgProject from "../img/imgProject.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Home.css";

export default function Home() {
  return (
    <div className="container-fluid p-0">
      <div
        className="header-image"
        style={{
          overflowX: "hidden",
          backgroundImage: `url(${imgProject})`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
          <div dir="rtl" className="col-lg-12 text-center">
       
     <p className="homeText">מחפשים עזרה בתחום מסויים? הגעתם למקום הנכון.</p>
     <p className="homeText">  כאן תוכלו למצוא עורכי דין מכל התחומים, </p>
     <p className="homeText">  בנוסף למגוון רחב של מאגר שאלות ותשובות וגם צאט אונליין.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
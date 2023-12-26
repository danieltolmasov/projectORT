import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLawyer } from "../firebase/lawyers";
import "../style/InfoLawyers.css"

export default function InfoLawyers() {
  const { id } = useParams();

  const [lawyer, setLawyer] = useState({})

  useEffect(() => {
    const fetchLawyer = async () => {
      const data = await getLawyer(id);
      setLawyer(data);
      console.log(data);
    };

    fetchLawyer();
  }, []);

  return (
    <div className="infoContainer">
      <div className="Iinfo">
        <img className="LImg" src={lawyer.photo} />
      </div>
      <div className="infoLawyers">
        <div className="infoName">
        <h1>{lawyer.name} {lawyer.lastName}</h1>
        </div>
        <div dir="rtl" className="Minfo">
          מיקום:
          <h5>{lawyer.address} {lawyer.location}</h5>
            התמחות:
            <h5>{lawyer. specialization}</h5>
            שנים בתחום:
            <h5>{lawyer.years}</h5>
            קצת על עצמי:
            <h5>{lawyer.information}</h5>
            יצירת קשר:

            <h5>{lawyer.email}</h5>
            <h5>{lawyer. phoneNumber}</h5>
        </div>
      </div>
    </div>
  );
}
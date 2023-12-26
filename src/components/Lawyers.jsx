import React, { useEffect, useState } from "react";
import { getLawyers } from "../firebase/lawyers";
import "../style/Lawyer.css";
import { RxRows } from 'react-icons/rx';
import { useNavigate} from 'react-router-dom'

export default function Lawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      const data = await getLawyers();
      setLawyers(data);
    };

    fetchLawyers();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/6589c5b2dc7465401888a10c");
        const data = await response.json();
        setCities(data.record.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
  
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      const response = await fetch("https://api.jsonbin.io/v3/b/64107bf3ace6f33a22eeaac8");
      const data = await response.json();
      setTitles(data.record.map((lawyer) => lawyer.title));
    };

    fetchTitles();
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
  };

  const handleYearsChange = (event) => {
    const [minYears, maxYears] = event.target.value.split("-");
    setSelectedYears([minYears ? parseInt(minYears) : null, maxYears ? parseInt(maxYears) : null]);
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const cityMatch = !selectedCity || lawyer.location === selectedCity;
    const titleMatch = !selectedTitle || lawyer.specialization === selectedTitle;
    const yearsMatch = !selectedYears[0] && !selectedYears[1] ||
      (selectedYears[0] ? lawyer.years >= selectedYears[0] : true) &&
      (selectedYears[1] ? lawyer.years <= selectedYears[1] : true);
    return cityMatch && titleMatch && yearsMatch;
  });

  return (
    <div dir="rtl" className="lawyersContainer ">
     
 

      <RxRows className="menuIcon d-none d-sm-block" onClick={() => setSideBar(!sideBar)}/>
      <div className={`sidebar ${sideBar ? 'show' : ''}`}> 
      <div className="sel">  
      <h5 className="sinun">בחר מיקום משרד </h5>
         <select value={selectedCity} onChange={handleCityChange}>
          <option value="">כל הערים</option>
          {cities.map((city, index) => (
  <option key={index} value={city}>{city}</option>
))}
        </select>
        </div>
      <div className="sel"> 
      <h5  className="sinun" >בחר התמחות  </h5>
      <select value={selectedTitle} onChange={handleTitleChange}>
          <option value="">כל ההתמחויות</option>
          {titles.map((title, index) => (
            <option key={index} value={title}>{title}</option>
          ))}
        </select>
        </div>
      <div className="sel"> 
      <h5 className="sinun">בחר שנות נסיון  </h5>
      <select value={selectedYears.join("-")} onChange={handleYearsChange}>
          <option value="">כל השנים</option>
          <option value="0-5">0-5 שנים</option>
          <option value="6-10">6-10 שנים</option>
          <option value="11-20">11-20 שנים</option>
          <option value="21-30">21-30 שנים</option>
          <option value="31+">31+ שנים</option>
        </select></div>
   
       
       
      </div> 



      
      <div className="container-fluid ">
      <div className={`mt-2 d-block d-sm-none  sidebar2  ${sideBar ? 'show' : ''}` } > 
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">כל הערים</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        <select value={selectedTitle} onChange={handleTitleChange}>
          <option value="">כל ההתמחויות</option>
          {titles.map((title, index) => (
            <option key={index} value={title}>{title}</option>
          ))}
        </select>
        <select value={selectedYears.join("-")} onChange={handleYearsChange}>
          <option value="">כל השנים</option>
          <option value="0-5">0-5 שנים</option>
          <option value="6-10">6-10 שנים</option>
          <option value="11-20">11-20 שנים</option>
          <option value="21-30">21-30 שנים</option>
          <option value="31+">31+ שנים</option>
        </select>
      </div> 
        <div className="cardsLawyer d-flex justify-content-start">
          {filteredLawyers.map((lawyer) => (
            <div className="flip-card" onClick={() => {
              navigate(`/lawyers/${lawyer.id}`)
            }}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="imgLawyers" src={lawyer.photo} />
                  
                  <h1 className="textName">
                    {lawyer.name} {lawyer.lastName}
                  </h1>
                  
                 
                </div>
                <div className="flip-card-back">
                  <p className="textInfo">{lawyer.information}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  








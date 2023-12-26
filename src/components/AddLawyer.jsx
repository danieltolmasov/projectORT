import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { addLawyer, updateLawyer, getLawyers } from "../firebase/lawyers";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/AddLawyer.css";
import UserContext from "../data/UserContext";

export default function AddLawyer() {
  const { user } = useContext(UserContext);
  const [cities, setCities] = useState([]);

  const [lawyer, setLawyer] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    photo: "null",
    location: "",
    specialization: "",
    years: "",
    information: "",
  });
  const [specializations, setSpecializations] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const setField = (field, value) => {
    setLawyer({ ...lawyer, [field]: value });
  };

  const handleFileChange = (event) => {
    setField("photo", event.target.files[0]);
  };
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
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/64107bf3ace6f33a22eeaac8"
        );
        const data = response.data.record;
        setSpecializations(data);
      } catch (error) {
        console.error("Error fetching specialization titles:", error);
      }
    };

    fetchSpecializations();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchLawyerData = async () => {
        try {
          const lawyersData = await getLawyers();
          const existingLawyerData = lawyersData.find(
            (lawyerData) => lawyerData.email === user.email
          );

          if (existingLawyerData) {
            setLawyer(existingLawyerData);
            setEditMode(true);
          }
        } catch (error) {
          console.error("Error fetching lawyer data:", error);
        }
      };

      fetchLawyerData();
    }
  }, [user]);

  const validate = () => {
    if (
      !lawyer.name ||
      !lawyer.lastName ||
      !lawyer.email ||
      !lawyer.address ||
      !lawyer.phoneNumber ||
      !lawyer.location ||
      !lawyer.specialization ||
      !lawyer.years ||
      !lawyer.photo ||
      !lawyer.information
    ) {
      alert("מלא את כול הפרטים בדף");
      return false;
    }
    return true;
  };

  const add = () => {
    addLawyer(user.uid, {
      email: user.email,
    });
  };

  const save = () => {
    if(!user)
    {
     alert("הירשם או התחבר לאתר ")
    }
    add();
  
    if (!validate()) {
      return;
    }
    updateLawyer(user.uid, lawyer);
    alert("עורך הדין נוסף בהצלחה");
    clear();
  };

  const clear = () => {
    setLawyer({
      name: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      photo: null,
      location: "",
      specialization: "",
      years: "",
      information: "",
    });
  };

  return (
    <div
      className="icontainer d-flex"
      style={{
        backgroundImage: `url("https://img.freepik.com/premium-photo/man-s-hand-holding-pen-writing-white-background-space-text_41050-5128.jpg?w=2000")`,
        height: "91vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="right">
        <div className="title">
          <h4>טופס בקשה להוספת עורך דין</h4>
        </div>
        <div className="addInfo  d-flex " style={{ height: "60vh" }}>
          <div className="infoL">
            <form style={{ marginLeft: "30px" }}>
              <div dir="rtl" className="form-group">
                <label htmlFor="location">עיר</label>
                <select
                  className="form-control"
                  id="location"
                  value={lawyer.location}
                  onChange={(e) => setField("location", e.target.value)}
                  disabled={editMode}
                >
                  <option value=""></option>
                  {cities.map((city, index) => (
  <option key={index} value={city}>{city}</option>
))}
                </select>
              </div>
              <div dir="rtl" className="form-group">
                <label htmlFor="specialization">התמחות</label>
                <select
                  className="form-control"
                  id="specialization"
                  value={lawyer.specialization}
                  onChange={(e) => setField("specialization", e.target.value)}
                  disabled={editMode}
                >
                  <option value=""></option>
                  {specializations.map((specialization) => (
                    <option key={specialization.id} value={specialization.title}>
                      {specialization.title}
                    </option>
                  ))}
                </select>
              </div>
              <div dir="rtl" className="form-group ">
                <label htmlFor="years">שנות התמחות</label>
                <input
                  type="number"
                  className="form-control"
                  id="years"
                  value={lawyer.years}
                  onChange={(e) => setField("years", e.target.value)}
                  disabled={editMode}
                />
              </div>
              <div dir="rtl" className="form-group">
                <label htmlFor="information">מידע</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  value={lawyer.information}
                  onChange={(e) => setField("information", e.target.value)}
                  disabled={editMode}
                ></textarea>
              </div>
              <div dir="rtl" className="form-group">
                <label htmlFor="photo">תמונה</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="photo"
                  disabled={editMode}
                  onChange={handleFileChange}
                />
              </div>
            </form>
          </div>
          <div className="infoL">
            <form style={{ marginRight: "30px" }}>
              <div dir="rtl" className="form-group">
                <label htmlFor="name">שם</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={lawyer.name}
                  onChange={(e) => setField("name", e.target.value)}
                  disabled={editMode}
                />
              </div>
              <div dir="rtl" className="form-group">
                <label htmlFor="lastName">שם משפחה</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lawyer.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  disabled={editMode}
                />
              </div>
              <div dir="rtl" className="form-group">
                <label htmlFor="email">אמייל</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={lawyer.email}
                  onChange={(e) => setField("email", e.target.value)}
                  disabled={editMode}
                />
              </div>
              <div dir="rtl" className="form-group">
                <label htmlFor="address">כתובת משרד</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={lawyer.address}
                  onChange={(e) => setField("address", e.target.value)}
                  disabled={editMode}
                />
              </div>
              <div dir="rtl" className="form-group">
                <label htmlFor="phoneNumber">טלפון</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  value={lawyer.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  disabled={editMode}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="lawyerButton  justify-content-center">
          {editMode ? (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setEditMode(false)}
            >
              עריכה
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={save}
            >
              הוספה
            </button>
          )}
          <button type="button" className="btn btn-secondary" onClick={clear}>
            נקה
          </button>
        </div>
      </div>
    </div>
  );
}

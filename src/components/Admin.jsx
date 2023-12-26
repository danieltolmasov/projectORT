import React, { useEffect, useState ,useContext} from "react";
import { getLawyers, deleteLawyer } from "../firebase/lawyers"; 
import UserContext from "../data/UserContext";
import '../style/admin.css'
export default function Admin() {
  const [adminLawyers, setAdminLawyers] = useState([]);
  const { adminConnection, setAdminConnection } = useContext(UserContext);
  useEffect(() => {
    const fetchAdminLawyers = async () => {
      try {
        const adminLawyersData = await getLawyers();
        setAdminLawyers(adminLawyersData);
      } catch (error) {
        console.error("שגיאה בטעינת רשימת עורכי הדין:", error);
      }
    };

    fetchAdminLawyers();
  }, []);


  const handleDeleteLawyer = async (lawyerId) => {
   
        try {
            await deleteLawyer(lawyerId);
      
            const updatedAdminLawyers = adminLawyers.filter(
              (lawyer) => lawyer.id !== lawyerId
            );
            setAdminLawyers(updatedAdminLawyers);
      
            alert("עורך הדין נמחק בהצלחה");
          } catch (error) {
            console.error("שגיאה במחיקת עורך הדין:", error);
            alert("אירעה שגיאה במחיקת עורך הדין");
          
       
    }
  

  };

  return (
    <div className="adminContainer">
      <h1>ניהול מערכת - עורכי דין</h1>
      <div dir="rtl" className="admin-lawyers-list">
        {adminLawyers.map((lawyer) => (
          <div key={lawyer.id} className="admin-lawyer">
            <img className="imgAdmin" src={lawyer.photo} alt={lawyer.name} />
            <div className="name-wrapper">
              <span className="textAdmin">{lawyer.name} {lawyer.lastName}</span>
            </div>
            <p>
              <button onClick={() => handleDeleteLawyer(lawyer.id)}>מחק</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

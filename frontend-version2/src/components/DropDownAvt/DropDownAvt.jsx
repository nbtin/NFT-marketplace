

import "./DropDownAvt.css"
import user from '../../assets/images/avt.png';
import logout from '../../assets/images/log-out.png';
import React, { useState } from 'react';
import setCookie from "../../Cookie/setCookie";
import { useNavigate } from "react-router-dom";
export default function DropCard() {
  const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);
  let navigate = useNavigate();
  function handleLogout() {

      setCookie("logged", 0);
      window.location.reload(); 
      return navigate("/");
  }
 return (
    <div>
        <img className="img-avt" src={user} onClick={toggleOpen}></img>
        <div
          className={`dropdown-menu ${dropdown ?'show' : ''}`}
          >
            <span className="dropdown-item">
            <img className="img-logout"  src= {logout} onClick={handleLogout}>  
            </img>
            </span>
         </div>
     </div>
  );
}
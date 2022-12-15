
import "./DropDownAvt.css"
import user from '../../assets/images/avt.png';
import logout from '../../assets/images/log-out.png';
import React, { useState, useEffect, useRef } from 'react';
import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import { useNavigate } from "react-router-dom";
export default function DropCard() {
  const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);
  let navigate = useNavigate();
  let menuRef = useRef();
  function handleLogout() {

      setCookie("logged", 0);
      window.location.reload(); 
      return navigate("/");
  }
  useEffect(() => {
    let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
            setDropdown(false);
            console.log(menuRef.current);
        }
    };

    document.addEventListener("mousedown", handler);


    return () => {
        document.removeEventListener("mousedown", handler);
    }

});

 return (
    <div ref={menuRef} >
        <img  className="img-avt" src={user} onClick={toggleOpen}></img>
        <div
          className={`dropdown-menu ${dropdown ?'show' : ''}`}
          >
                <h3>{getCookie("username")}<br /><span>---------</span></h3>
                <ul  onClick={() => handleLogout()}>
                    
                        <DropdownItem
                            img={logout}
                            text={"Đăng xuất"}
                           
                        />
                   
                </ul>
         </div>
     </div>
  );
}

function DropdownItem(props) {
  return (
      <li className='dropdownItem'>
          <img src={props.img}></img>
          <a> {props.text} </a>
      </li>
  );
}
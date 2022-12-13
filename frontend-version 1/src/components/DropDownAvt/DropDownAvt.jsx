import {
    Button,
    Navbar,
    ListGroup,
    Dropdown,
    Carousel,
    Nav,
    Container,
    NavDropdown,
    Form,
} from "react-bootstrap";
import logo from '../../images/opensea.svg';
import user from '../../images/avt.png';
import edit from '../../images/opensea.svg';
import inbox from '../../images/opensea.svg';
import settings from '../../images/opensea.svg';
import help from '../../images/opensea.svg';
import logout from '../../images/log-out.png';
import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import removeCookie from "../../Cookie/removeCookie";
import { useNavigate } from "react-router-dom";
import './DropDownAvt.css';

import React, { useState, useEffect, useRef } from 'react';

function App() {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    function handleLogout() {

        setCookie("logged", 0);
        console.log(getCookie("logged"))
        window.location.reload(); 
        return navigate("/");
    }
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <div 
        ref={menuRef}>
            <div onClick={() => { setOpen(!open) }}>
                <img src={user}></img>
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} 
             href ="/profile">
                

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

export default App;
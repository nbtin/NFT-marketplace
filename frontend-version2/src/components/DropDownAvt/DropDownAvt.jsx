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
import user from '../../assets/images/avt.png';
import logout from '../../assets/images/log-out.png';
import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import removeCookie from "../../Cookie/removeCookie";
import { useNavigate } from "react-router-dom";
import './DropDownAvt.css';

import React, { useState, useEffect, useRef } from 'react';
import { Label } from "reactstrap";

function DropDownAvt() {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    function handleLogout() {

        setCookie("logged", 0);
        console.log(getCookie("logged"))
        window.location.reload();
        return navigate("/");
    }


    return (
                <span>
                    <img className="avt-img" src={user} 
                    
                    onClick={handleLogout}/>
                </span>

    );
}


export default DropDownAvt;
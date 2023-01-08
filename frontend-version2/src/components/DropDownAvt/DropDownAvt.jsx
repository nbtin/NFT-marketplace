
import "./DropDownAvt.css"
import user from '../../assets/images/avt.png';
import logout from '../../assets/images/log-out.png';
import React, { useState, useEffect, useRef } from 'react';
import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import { useNavigate } from "react-router-dom";

import { configs } from '../../configs/configs';

export default function DropCard(props) {
    const [dropdown, setDropdown] = useState(false);
    const [balance, setBalance] = useState(0);
    const toggleOpen = () => setDropdown(!dropdown);
    let navigate = useNavigate();
    let menuRef = useRef();
    let server = configs();
    function handleLogout() {

        setCookie("logged", 0);
        props.setChange(true);
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

    useEffect(() => {
        console.log("tao co ma");
        fetch(server + '/getwallet', {
            method: "POST",
            header:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wallet_id: getCookie('wallet_address')
            })
        })
            .then(resp => resp.json()).then(resp => { setBalance(resp.data.wallet_balance);console.log(getCookie('wallet_address'));}).then(error => {});
    }
    )

    return (
        <div ref={menuRef} >
            <img className="img-avt" src={user} onClick={toggleOpen}></img>
            <div
                className={`dropdown-menu ${dropdown ? 'show' : ''}`}
            >
                <h3>{getCookie("username")}<br /><span>---------</span></h3>
                <div>{'Balance: ' + Math.round(balance*100)/100 + ' ETH'}</div>
                <ul onClick={() => handleLogout()}>

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
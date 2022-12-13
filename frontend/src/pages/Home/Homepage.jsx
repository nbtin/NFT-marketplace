import { Button, Navbar, ListGroup, Dropdown, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Routes, Route } from 'react-router-dom';
import "./Homepage.css";
import Login from "../../components/Login/Login"


function Homepage() {
    return (

        <div className="background-first">
            <NavBar />

        </div>

    );

}
export default Homepage;
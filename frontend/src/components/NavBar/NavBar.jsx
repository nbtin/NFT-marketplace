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
import { Link } from "react-router-dom";
import "./NavBar.css";
import GlobalStyles from "../GlobalStyles/GlobalStyles.css";
import DropDownAvt from "../DropDownAvt/DropDownAvt"
import { FaQuestion, FaUser, FaKey, FaListUl } from "react-icons/fa";
import React, { useState, useEffect } from "react";

import logo from "../../images/opensea.svg";
import search from "../../images/search.svg";

import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import removeCookie from "../../Cookie/removeCookie";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const logged = getCookie("logged") === "0" ? true : false
    console.log(getCookie("logged"))
    return (
        <>
            <Navbar>
                <Container className="d-flex" style={{ paddingInlineStart: "10px", paddingInlineEnd: "10px"  }}>
                    <Navbar.Brand className="d-flex-navbarbrand" href="/">
                        <img
                            src={logo}
                            alt="Avatar Logo"
                            style={{ width: "6vh",height: "50px",marginTop:"10px", marginInlineStart: "10px" }}

                        />
                        <p className="t-nameapp">
                            OpenSea
                        </p>
                    </Navbar.Brand>
                    <Form className="search">
                        <img
                            src={search}
                            alt="Search Icon"
                            style={{ height: "4vh", marginTop: "8px", marginInlineStart: "5px" }}
                        />
                        <Form.Control className="search-text"
                            type="search"
                            placeholder="Tìm kiếm NFTs"
                        />
                    </Form>
                    <Nav className="nav-item">
                        <Nav.Link className="nav-item-item" href="/khampha" >
                            Khám phá
                        </Nav.Link>

                        <Nav.Link className="nav-item-item" href="/tintuc" >
                            Tin tức
                        </Nav.Link>

                        <Nav.Link className="nav-item-item" href="/bangxephang" >
                            Bảnh xếp hạng
                        </Nav.Link>

                    </Nav>
                    {logged === false ? (
                        <>
                            <Button className="button-log" href="/dangnhap"
                                type="button"
                                
                            >
                                Đăng nhập
                            </Button>
                            <Button className="button-log" href="/dangky"
                                type="button"
                            >
                                Đăng ký
                            </Button>
                        </>
                    ) :

                        (
                            <>
                            <DropDownAvt/>
                            </>
                        )}

                </Container>
            </Navbar>
        </>
    );

}

export default NavBar;
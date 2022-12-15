import {
  Button
} from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";
import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import removeCookie from "../../Cookie/removeCookie";
import { NavLink, Link } from "react-router-dom";
import DropDownAvt from "../../components/DropDownAvt/DropDownAvt";
const NAV__LINKS = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Contact",
    url: "/contact",
  },
];

const Header = () => {
  const logged = getCookie("logged") === "1" ? true : false
  console.log(getCookie("logged"))

  return (
    <header className="header" >
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i class="ri-fire-fill"></i>
              </span>
              NFTs
            </h2>
          </div>

          <div className="nav__menu"  >
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
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
                  <DropDownAvt />

                </>
              )}

            <span className="mobile__menu">
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

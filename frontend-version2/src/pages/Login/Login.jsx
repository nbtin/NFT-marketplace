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
import { useNavigate } from "react-router-dom";
import "./Login.css"
import React, { useState, useEffect } from "react";
import {handleLoginAPI} from "../../servies/handleLogin"
import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import removeCookie from "../../Cookie/removeCookie";

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log("123");
    async function handleLogin() {
        try {
    
            //let user = await handleLoginAPI(email, password);
            // let user = "";
            // user = "Logged in successfully"
            const user ={"status":"Logged in successfully","data": {

                "email": "taihotboyhihi@gmail.com",
                "username": "Võ Văn Tài",
                "wallet_address": "dádasd12312dsad"
            }};
            console.log(user);
            if (user.status === "Logged in successfully") {
                console.log("thanh cong");
                setCookie("email",user.data.email);
                setCookie("username",user.data.username)
                setCookie("logged",1)
                setCookie("wallet_address",user.data.wallet_address)
                return navigate("/");
            } else {
                document.getElementById("form3Example3").value = "";
                document.getElementById("form3Example4").value = "";
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="full-screen">

            <div className="block-login" >
                <div className="word-dangnhap"
>
                    Đăng nhập
                </div>
                <div className="word-note">
                    Lưu ý: Hãy nhập đúng email và mật khẩu nhé.
                </div>
                <div>
                    <Form className="input-box">

                        <Form.Control className="input-text"
                            type="email"
                            id="form3Example3"
                            placeholder="Nhập email người dùng"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form>
                </div>
                <div>
                    <Form className="input-box">

                        <Form.Control className="input-text"
                            type="password"
                            id="form3Example4"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </Form>
                </div>
                <Button className="button-log"
                    type="button"
                    onClick={() => handleLogin()}
                >
                    Đăng nhập
                </Button>
            </div>

        </div>
    );

}
export default Login;
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.scss"
import React, { useState, useEffect } from "react";
import { handleLoginAPI } from "../../servies/handleLogin"
import setCookie from "../../Cookie/setCookie";
import getCookie from "../../Cookie/getCookie"
import removeCookie from "../../Cookie/removeCookie";
import '../Register/Register.scss'
import google from '../../assets/images/google.png';
import facebook from '../../assets/images/facebook.png';
import eye from '../../assets/images/eye.png';
import eyeslash from '../../assets/images/eyeslash.png';
import nft from '../../assets/images/nft.jpg';

function Login(props) {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    console.log("123");
    async function handleLogin() {
        try {

            let user = await handleLoginAPI(email, password);
            // let user = "";
            // user = "Logged in successfully"
            // const user ={"status":"Logged in successfully","data": {

            //     "email": "taihotboyhihi@gmail.com",
            //     "username": "Võ Văn Tài",
            //     "wallet_address": "dádasd12312dsad"
            // }};
            console.log(user);
            if (user.status === "Logged in successfully") {
                console.log("thanh cong");
                setCookie("email", user.data.email);
                setCookie("username", user.data.username)
                setCookie("user_id", user.data.user_id)
                setCookie("logged", 1)
                setCookie("wallet_address", user.data.wallet_address)
                return navigate("/");
            } else {
                document.getElementById("form3Example3").value = "";
                document.getElementById("form3Example4").value = "";
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className="login-background">
            <div className="nft"><img src={nft} /></div>

            <div className="login-container">
                <div className="login-content">
                    <div className="text-login"> Login</div>

                    <div className="login-input">
                        <input
                            type="text"
                            id="form3Example3"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div className="login-input">
                        <div className="costum-input-pw">
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                id="form3Example4"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                            <span
                                onClick={() => { setShowHidePassword() }} >
                                <img src={isShowPassword ? eye : eyeslash} />
                            </span>
                        </div>
                    </div>

                    <button className="btn-login" onClick={() => handleLogin()} > Login</button>

                    <div className="already">
                        <span >Don't have an account yet? <span className="switch" onClick={() => props.onFormSwitch('register')}>Register</span> </span>
                    </div>
                    <div className="text-other-login">
                        <span > Or login with </span>
                    </div>
                    <div className="social-login">
                        <span className="icon">
                            <img src={google} className="google" />Continue with Google</span>
                    </div>
                    <div className="social-login">
                        <span className="icon">
                            <img src={facebook} className="facebook" />Continue with Facebook</span>

                    </div>
                </div>

            </div>
        </div>
    );

}
export default Login;
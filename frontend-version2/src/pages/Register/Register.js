import React, { Component, useState } from 'react';
import './Register.scss'
import { toast } from 'react-toastify';
import google from '../../assets/images/google.png';
import facebook from '../../assets/images/facebook.png';
import eye from '../../assets/images/eye.png';
import eyeslash from '../../assets/images/eyeslash.png';
import nft from '../../assets/images/nft.jpg';
import { configs } from '../../configs/configs';

function Register(props) {

    let server = configs();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirm, setPasswordConfirm] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    async function handleRegisterAPI(username, email, password) {
        let user = ""
        await fetch(server + '/register', {
            method: "POST",
            header:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then(resp => resp.json()).then(resp => { user = resp; }).then(error => console.log(error));
        return user;
    }

    async function hanldeRegister() {
        if (!username ||
            !email ||
            !password ||
            !passwordconfirm) {
            toast.error(`Missing infomation!`)
        }
        if (username && username.includes(" ")) {
            toast.error(`Username is not valid!`)
        }
        if (email && (!email.includes("@gmail.com") || email.includes(" "))) {
            toast.error(`Email is not valid!`)
        }
        if (password && (password.length < 6 || password.length > 24)) {
            toast.error(`Password must be at 6-24 characters!`)
        }
        if (password.length >= 6 && password.length <= 24 && password.match(/^\s|\s$/)) {
            toast.error(`Password can not begin or end with space!`)
        }
        if (passwordconfirm && password !== passwordconfirm) {
            toast.error(`Passwords don't match!`)
        }
        else if (password.length >= 6 && password.length <= 24 && !password.match(/^\s|\s$/) && passwordconfirm && password === passwordconfirm) {
            try {
                let user = await handleRegisterAPI(username, email, password);
                console.log(user);
                console.log(username, email, password, passwordconfirm);
                if (user.status === "success") {
                    console.log("Thanh cong");
                    toast.success(`Register success`)
                    props.onFormSwitch('login');
                }
                else if (user.status === "error" &&
                    (user.data.username && user.data.username[0] === "user with this username already exists." ||
                        user.data.email && user.data.email[0] === "user with this email already exists.")) {
                    toast.error(`Account already exists!`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const setShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (

        <div className="register-background">
            <div ><img className="nft" src={nft} /></div>

            <div className="register-container">
                <div className="register-content">
                    <div className="text-register"> Register</div>
                    <div className="register-input">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </div>

                    <div className="register-input">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div className="register-input">
                        <div className="costum-input-pw">
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                            <span
                                onClick={() => { setShowHidePassword() }} >
                                <img src={isShowPassword ? eye : eyeslash} />
                            </span>
                        </div>
                    </div>

                    <div className="register-input">
                        <input
                            type="password"

                            placeholder="Confirm Password"
                            value={passwordconfirm}
                            onChange={(event) => setPasswordConfirm(event.target.value)} />
                    </div>

                    <div>
                        <button className="btn-register" onClick={() => { hanldeRegister() }} > Register</button>
                    </div>

                    <div className="already">
                        <span >Already have an account? <span className="switch" onClick={() => props.onFormSwitch('login')}>Login</span> </span>
                    </div>

                    <div className="text-other-register">
                        <span > Or register with </span>
                    </div>
                    <div className="social-register">
                        <span className="icon">
                            <img src={google} className="google" />Continue with Google</span>
                    </div>
                    <div className="social-register">
                        <span className="icon">
                            <img src={facebook} className="facebook" />Continue with Facebook</span>

                    </div>
                </div>
            </div>
        </div >
    )
}


export default Register;
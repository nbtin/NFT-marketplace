import React, { useState } from 'react';
import './Register.scss'
//import { toast } from 'react-toastify';
import google from '../../assets/images/google.png';
import facebook from '../../assets/images/facebook.png';
import eye from '../../assets/images/eye.png';
import eyeslash from '../../assets/images/eyeslash.png';
import nft from '../../assets/images/nft.jpg';

function Register(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirm, setPasswordConfirm] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const reset = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setIsShowPassword(false);
    }


    const hanldeRegister = () => {
        if (!username ||
            !email ||
            !password ||
            !passwordconfirm) {
            alert(`Missing infomation!`)
            //toast.error(`Missing infomation!`)
            return;
        }
        if (password.length < 6) {
            alert(`Password length is at least 6 characters!`)
            //  toast.error(`Password length is at least 6 characters!`)
            return;
        }
        if (password !== passwordconfirm) {
            alert(`Passwords don't match!`)
            //toast.error(`Passwords don't match!`)
            return;
        }
        else {
            console.log(username, email, password, passwordconfirm)
            //toast.success(`Register success`)
            const res = {
                username,
                email,
                password
            };
            fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res)

            });
            reset();
            return;
        }
    }

    const setShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className="register-background">
            <div className="nft"><img src={nft} /></div>

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
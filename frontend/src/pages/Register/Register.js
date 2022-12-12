import React, { useState } from 'react';
import './Register.scss'
import { ToastContainer, toast } from 'react-toastify';
import google from '../../images/google.png';
import facebook from '../../images/facebook.png';
import eye from '../../images/eye.png';
import eyeslash from '../../images/eyeslash.png';
import nft from '../../images/nft.jpg';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirm, setPasswordConfirm] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    // const reset = () => {
    //     username: '';
    //     email: '';
    //     password: '';
    //     passwordconfirm: '';
    //     phone: '';
    //     gender: '';
    //     gendertext: '';
    //     isShowPassword: false;
    // }

    const hanldeRegister = (event) => {
        if (!username ||
            !email ||
            !password ||
            !passwordconfirm) {
            toast.error(`Missing infomation!`)
            return;
        }
        if (password.length < 6) {
            toast.error(`Password length is at least 6 characters!`)
            return;
        }
        if (password !== passwordconfirm) {
            toast.error(`Passwords don't match!`)
            return;
        }
        else {
            console.log(username, email, password, passwordconfirm)
            toast.success(`Register success`)
            //setState(reset);
            return;
        }
    }

    const setShowHidePassword = () => {
        isShowPassword: setIsShowPassword(!isShowPassword);
    }

    return (
        <div className="register-background">
            <img src={nft} />
            <div className="register-container">
                <div className="register-content row">
                    <div className="col-12 text-register"> Register</div>
                    <div className="col-12 form-group register-input">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </div>

                    <div className="col-12 form-group register-input">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div className="col-12 form-group register-input">
                        <div className="costum-input-pw">
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                            <span
                                onClick={() => { setShowHidePassword() }} >
                                {/* <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i> */}
                                <img src={isShowPassword ? eye : eyeslash} />
                            </span>
                        </div>
                    </div>

                    <div className="col-12 form-group register-input">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={passwordconfirm}
                            onChange={(event) => setPasswordConfirm(event.target.value)} />
                    </div>

                    <div className="col-12">
                        <button className="btn-register" onClick={(event) => hanldeRegister(event)} > Register</button>
                    </div>

                    <div className="col-12">
                        <span className="already">Already have an account? <a target="_sefl" href="https://facebook.com">Login</a> </span>
                    </div>

                    <div className="col-12 text-center">
                        <span className="text-other-register mt-3"> Or register with </span>
                    </div>
                    <div className="col-12 social-register">
                        <span className="icon">
                            <img src={google} className="google" />Continue with Google</span>
                    </div>
                    <div className="col-12 social-register">
                        <span className="icon">
                            <img src={facebook} className="facebook" />Continue with Facebook</span>

                    </div>
                </div>
            </div>
        </div >
    )
    // }
}


export default Register;
import React, { Component } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import './Register.scss'
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { textFilter } from "react-bootstrap-table2-filter";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordconfirm: '',
            phone: '',
            gender: '',
            gendertext: '',
            isShowPassword: false
        };
    }

    setAge(checkedValue) {
        this.setState({
            age: checkedValue
        })
    }

    setGender(checkedValue) {
        this.setState({
            gender: checkedValue
        })
    }

    reset() {
        this.setState({
            username: '',
            email: '',
            password: '',
            passwordconfirm: '',
            phone: '',
            gender: '',
            gendertext: '',
            isShowPassword: false
        })
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnChangePasswordConfirm = (event) => {
        this.setState({
            passwordconfirm: event.target.value
        })
    }

    hanldeShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    hanldeRegister = (event) => {
        if (!this.state.username ||
            !this.state.email ||
            !this.state.password ||
            !this.state.passwordconfirm ||
            !this.state.gender ||
            !this.state.phone) {
            toast.error(`Missing infomation!`)
            return;
        }
        if (this.state.password.length < 6) {
            toast.error(`Password length is at least 6 characters!`)
            return;
        }
        if (this.state.password !== this.state.passwordconfirm) {
            toast.error(`Passwords don't match!`)
            return;
        }
        else {
            toast.success(`Register success`)
            this.reset();
            return;
        }
    }

    render() {
        return (
            <div className="register-background">
                <img src="https://fsivietnam.com.vn/wp-content/uploads/2022/02/NFT-1.jpg" />
                <div className="register-container">
                    <div className="register-content row">
                        <div className="col-12 text-register"> Register</div>

                        <div className="col-12 form-group register-input">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>

                        <div className="col-12 form-group register-input">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)} />
                        </div>

                        <div className="col-12 form-group register-input">
                            <div className="costum-input-pw">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)} />
                                <span
                                    onClick={() => { this.hanldeShowHidePassword() }} >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>

                        <div className="col-12 form-group register-input">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={this.state.passwordconfirm}
                                onChange={(event) => this.handleOnChangePasswordConfirm(event)} />
                        </div>

                        <div className="col-12 form-group register-input">
                            <div className="costum-input-phone" >
                                <PhoneInput
                                    country={'vn'}
                                    placeholder="Phone number"
                                    value={this.state.phone}
                                    onChange={phone => this.setState({ phone })}

                                />
                                <i className="fas fa-phone-square fa-2x"></i>
                            </div>
                        </div>

                        <div className="col-12 form-group register-input">
                            <div className="col-12 form-group sex">
                                <p className="flabel">Gender:</p>
                                <label>
                                    <input
                                        type="radio"
                                        className="gender"
                                        checked={(this.state.gender === 'Female')}
                                        onChange={this.setGender.bind(this, 'Female')} /> Female</label>
                                <label>
                                    <input
                                        type="radio"
                                        className="gender"
                                        checked={(this.state.gender === 'Male')}
                                        onChange={this.setGender.bind(this, 'Male')} /> Male</label>
                                <label>
                                    <input
                                        type="radio"
                                        className="gender"
                                        checked={(this.state.gender === 'Other')}
                                        onChange={this.setGender.bind(this, 'Other')} /> Other</label>

                            </div>
                        </div>

                        <div className="col-12">
                            <button className="btn-register" onClick={(event) => this.hanldeRegister(event)} > Register</button>
                        </div>

                        <div className="col-12">
                            <span className="already">Already have an account? <a target="_sefl" href="https://facebook.com">Login</a> </span>
                        </div>

                        {/* <div className="col-12 text-center">
                            <span className="text-other-register mt-3"> Or register with </span>
                        </div>
                        <div className="col-12 social-register">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default Register;
import React, { useState } from "react";
import AuthImage from '../../../assets/auth-image.jpg'
import './index.scss';
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../rest/auth";
import { useDispatch } from "react-redux";
import { setLoginCredentials } from "../../../stateManager/reducer/authDetails";
import toast from "react-hot-toast";


function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginCred, setLoginCred] = useState({
        username: '',
        password: ''
    })


    async function onLoginClick() {
        if (loginCred.username != '' && loginCred.password != '') {
            const res: any = await loginApi(loginCred)
            if (res) {
                dispatch(setLoginCredentials({
                    userDetails: res.userDetails,
                    authToken: res.authToken
                }))
                navigate('/home/dashboard')
            }
        } else {
            toast.error('Please enter valid username and password')
        }
    }

    return (
        <div className="login">
            <div className="left-side" >
                <div className="content-layout"  >
                    <div className="title">Welcome Back!!</div>
                    <div className="fields" >
                        <label className="label-style" >Username</label>
                        <input className="input-style" placeholder="Enter your username"
                            value={loginCred.username}
                            onChange={(e: any) => setLoginCred({ ...loginCred, username: e.target.value })}
                        />
                    </div>
                    <div className="fields" >
                        <label className="label-style">Password</label>
                        <input className="input-style" placeholder="Enter your password" type="password"
                            value={loginCred.password}
                            onChange={(e: any) => setLoginCred({ ...loginCred, password: e.target.value })}
                        />
                    </div>
                    <button className="login-btn" onClick={onLoginClick} >LOGIN</button>
                    <div className="create-new" >
                        Don't have account? <span className="signUp-btn"  onClick={() => navigate('/signup')} >SignUp</span>
                    </div>
                </div>
            </div>
            <div style={{ width: "60%" }} >
                <img src={AuthImage} height="100%" width="100%" />
            </div>
        </div>
    )
}

export default LoginPage;
import React, { useState } from "react";
import AuthImage from '../../../assets/auth-image.jpg'
import './index.scss';
import toast from "react-hot-toast";
import { addNewUser } from "../../rest/auth";
import { useNavigate } from "react-router-dom";


function SignUpPage() {
    const navigate = useNavigate();
    const [signupCred, setSignupCred] = useState({
        fullname: '',
        username: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    })


    async function onSignupClick() {
        const { fullname, username, email, newPassword, confirmPassword } = signupCred;
        if (fullname != '' && username != '' && email != '' && newPassword != '' && confirmPassword != '' && (newPassword === confirmPassword)) {
            const res: any = await addNewUser({ fullname, username, email, password: newPassword })
            if (res) {
                navigate('/')
            }
        } else {
            toast.error("Please enter valid sign up credentials!! Note: New password and confirm password should not same.")
        }
    }

    return (
        <div className="sign-up">
            <div className="left-side" >
                <div className="content-layout"  >
                    <div className="title">Create New Account!!</div>
                    <div className="fields" >
                        <label className="label-style" >Full Name</label>
                        <input className="input-style" placeholder="Enter your full name"
                            value={signupCred.fullname}
                            onChange={(e: any) => { setSignupCred({ ...signupCred, fullname: e.target.value }) }}
                        />
                    </div>
                    <div className="fields" >
                        <label className="label-style" >Email address</label>
                        <input className="input-style" placeholder="Enter your email address"
                            value={signupCred.email}
                            onChange={(e: any) => { setSignupCred({ ...signupCred, email: e.target.value }) }}
                        />
                    </div>
                    <div className="fields" >
                        <label className="label-style" >Username</label>
                        <input className="input-style" placeholder="Enter your username"
                            value={signupCred.username}
                            onChange={(e: any) => { setSignupCred({ ...signupCred, username: e.target.value }) }}
                        />
                    </div>
                    <div className="fields" >
                        <label className="label-style">New password</label>
                        <input className="input-style" placeholder="Enter your new password" type="password"
                            value={signupCred.newPassword}
                            onChange={(e: any) => { setSignupCred({ ...signupCred, newPassword: e.target.value }) }}
                        />
                    </div>
                    <div className="fields" >
                        <label className="label-style">Confirm password</label>
                        <input className="input-style" placeholder="Confirm your new password" type="password"
                            value={signupCred.confirmPassword}
                            onChange={(e: any) => { setSignupCred({ ...signupCred, confirmPassword: e.target.value }) }}
                        />
                    </div>
                    <button className="signUp-btn" onClick={onSignupClick} >SIGN UP</button>
                </div>
            </div>
            <div style={{ width: "60%" }} >
                <img src={AuthImage} height="100%" width="100%" />
            </div>
        </div>
    )
}

export default SignUpPage;
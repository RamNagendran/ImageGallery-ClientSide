import React from "react";
import './index.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearLoginCredentials } from "../../../stateManager/reducer/authDetails";
import { clearAllImages } from "../../../stateManager/reducer/images";

function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    function onMenuClick(path: string) {
        navigate(`/home/${path}`);
    }

    function logout () {
        dispatch(clearLoginCredentials())
        dispatch(clearAllImages())
        navigate('/')
    }

    return (
        <div className="menu">
            <div className="content-cover" >
                <div className="menu-content" onClick={() => onMenuClick('dashboard')}
                    style={{
                        background: location.pathname.includes('dashboard') ? "#cedfff" : "none",
                        fontWeight: location.pathname.includes('dashboard') ? 800 : 400,
                    }} >
                    Dashboard
                </div>
                <div className="menu-content" onClick={() => onMenuClick('images')}
                    style={{
                        background: location.pathname.includes('images') ? "#cedfff" : "none",
                        fontWeight: location.pathname.includes('images') ? 800 : 400,
                    }} >
                    Images
                </div>
            </div>
            <div className="content-cover">
                <div className="menu-content" style={{fontWeight:800, fontSize:"16px"}} onClick={logout} >LOGOUT</div>
            </div>
        </div>
    )
}

export default Menu;
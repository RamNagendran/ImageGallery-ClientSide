import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Image } from "react-bootstrap";
import Popover from 'react-bootstrap/Popover';
import { useSelector } from "react-redux";
import UserIcon from '../../../assets/user.svg'

function Header() {
    const { userDetails } = useSelector((state: any) => state.AuthDetails)
    const popover = (
        <Popover id="popover-basic" >
            <Popover.Header as="h3">{userDetails?.full_name}</Popover.Header>
            <Popover.Body>
                <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold" style={{ fontSize: "12px", marginRight: "10px" }}>USER NAME : </span>
                    <span >{userDetails?.user_name}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold" style={{ fontSize: "12px", marginRight: "10px" }}>USER ID : </span>
                    <span>{userDetails?.user_id}</span>
                </div>
                <div className="d-flex flex-column align-items-start mt-3">
                    <span className="fw-bold" style={{ fontSize: "12px", marginRight: "10px" }}>EMAIL : </span>
                    <span >{userDetails?.email}</span>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="header" >
            <div className="mx-3" >Image Gallery</div>
            <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover}>
                <div title={userDetails?.user_name} className="d-flex align-items-center"
                    style={userWrapper}>
                    <Image src={UserIcon} fluid
                        style={userIconStyle}
                    />
                </div>
            </OverlayTrigger>
        </div>
    )
}


export default Header;

const userWrapper = {
    color: "white",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
}

const userIconStyle = {
    background: "white",
    borderRadius: "25px",
    height: "22px",
    marginRight: "20px"
}

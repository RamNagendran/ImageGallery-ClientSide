import React from "react";
import SomethingWent_wrong from '../assets/something_wrong.png';
import { useNavigate } from "react-router-dom";


function ErrorBoudary() {

    const navigate = useNavigate()


    return (
        <div className="w-100 d-flex justify-content-center" style={{ height: "100vh" }} >
            <div style={{ marginTop: "100px" }} className="d-flex w-50 h-100 flex-column" >
                <div style={{ fontSize: "85px", fontWeight: 800 }} >Oops!!</div>
                <div style={{ fontSize: "23px", color: "#808080", fontWeight:500 }} >
                    <div>It seems that something went wrong, We're working on fixing it.
                        <br/>Feel free to go back and try again later.
                        <br/>Thanks for your patience!
                    </div>
                </div>
                <button onClick={() => navigate(-1)} type="button" className="btn btn-info w-50 mt-5" style={goBack}>
                    Go Back
                </button>
            </div>
            <img style={image} src={SomethingWent_wrong} alt="Something went wrong" />
        </div>
    )
}

export default ErrorBoudary;

const goBack = { color: "#fff", fontWeight: 800, fontSize: "18px" }
const image = { height: "500px", marginTop: "80px" }
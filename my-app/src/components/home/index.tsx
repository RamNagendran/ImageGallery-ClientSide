import React from "react";
import './index.scss';
import Menu from "./menu";
import { Outlet } from "react-router-dom";
import Header from "./contents/header";



function Home () {
    return (
        <div className="home">
            <Menu />
            <div className="right-side" >
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Home;
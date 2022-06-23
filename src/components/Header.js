import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

const Header = ({ username, profile_pic_url }) => {
    return (
        <div className="ui secondary menu header">
            <div className="left menu">
                <Link to="/">
                    <div className="logo item">Bablamos</div>
                </Link>
                <div className="search item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Search Bablamos" />
                        <i className="search link icon"></i>
                    </div>
                </div>
            </div>
            <div className="item center">
                <Link to="/">
                    <i className="home icon large" />
                </Link>
            </div>

            <div className="right menu">
                <div className="item">
                    <i className="comments icon large" />
                </div>
                <div className="item">
                    <i className="bell icon large" />
                </div>
                <div className="item">
                    <Link to={`/profile/${username}`} className="profile-link">
                        <img alt="profile" src={profile_pic_url} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;

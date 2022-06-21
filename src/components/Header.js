import React, { useState } from "react";
import "../css/header.css";

const Header = ({ username, profile_pic_url }) => {
    return (
        <div className="ui secondary menu header">
            <div className="left menu">
                <div className="logo item">Bablamos</div>
                <div className="search item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Search Bablamos" />
                        <i className="search link icon"></i>
                    </div>
                </div>
            </div>
            <div className="item center">
                <i className="home icon large" />
            </div>

            <div className="right menu">
                <div className="item">
                    <i className="comments icon large" />
                </div>
                <div className="item">
                    <i className="bell icon large" />
                </div>
                <div className="item">
                    <a href={`/profile/${username}`} className="profile-link">
                        <img alt="profile" src={profile_pic_url} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;

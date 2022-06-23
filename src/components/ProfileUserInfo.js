import React from "react";
import "../css/profile-user-info.css";
import ReactMarkdown from "react-markdown";

function ProfileUserInfo({ userInfo }) {
    return (
        <div className="user-info-menu">
            <h3>Info</h3>
            <ReactMarkdown>{userInfo}</ReactMarkdown>
        </div>
    );
}

export default ProfileUserInfo;

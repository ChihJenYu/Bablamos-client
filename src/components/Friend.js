import React from "react";
import "../css/friend.css"

function Friend({ status, profile_pic_url, username }) {
    return (
        <div className="item friend">
            <a className="ui tiny image">
                <img src={profile_pic_url} />
            </a>
            <div className="content">
                <a className="header">{username}</a>
                <i className="ellipsis horizontal icon"/>
            </div>
        </div>
    );
}

export default Friend;

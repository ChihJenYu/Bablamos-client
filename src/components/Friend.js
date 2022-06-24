import React from "react";
import "../css/friend.css";

function Friend({ status, profile_pic_url, username }) {
    return (
        <div className="item friend">
            <a className="ui tiny image" href={`/profile/${username}`}>
                <img src={profile_pic_url} />
            </a>
            <div className="content">
                <a className="header" href={`/profile/${username}`}>
                    {username}
                </a>
                <i className="ellipsis horizontal icon" />
            </div>
        </div>
    );
}

export default Friend;

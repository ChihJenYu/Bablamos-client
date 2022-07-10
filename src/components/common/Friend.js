import React from "react";
import "../../css/friend.css";

function Friend({ status, profile_pic_url, username, type }) {
    return (
        <div
            className="item friend"
            onClick={() => {
                window.location.href = `/profile/${username}`;
            }}
        >
            <a className="ui tiny image" href={`/profile/${username}`}>
                <img src={profile_pic_url} />
            </a>
            <div className="content">
                <a className="header">{username}</a>
                {type !== "search" ? (
                    <i className="ellipsis horizontal icon" />
                ) : null}
            </div>
        </div>
    );
}

export default Friend;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/profile-recent-friends.css";

function ProfileRecentFriends({ recentFriends, friendCount }) {
    const renderedRecentFriends = recentFriends.map((friend) => {
        return (
            <div key={friend.id} className="recent-friend-avatar">
                <img alt="profile" src={friend.profile_pic_url} />
                <label>{friend.friend_name}</label>
            </div>
        );
    });

    return (
        <div className="recent-friends-menu">
            <div className="recent-friends-info">
                <div className="friends-metadata">
                    <h3>Friends</h3>
                    <label>{friendCount} friends</label>
                </div>
                <Link to="/">See all friends</Link>
            </div>
            <div className="recent-friends-grid">{renderedRecentFriends}</div>
        </div>
    );
}

export default ProfileRecentFriends;

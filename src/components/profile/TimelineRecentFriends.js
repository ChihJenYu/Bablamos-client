import React from "react";
import "../../css/profile-recent-friends.css";

function TimelineRecentFriends({ recentFriends, friendCount, setActiveTab }) {
    const renderedRecentFriends = recentFriends.map((friend) => {
        return (
            <div
                key={friend.id}
                className="recent-friend-avatar"
                onClick={() => {
                    window.location.href = `/profile/${friend.friend_name}`;
                }}
                style={{ cursor: "pointer" }}
            >
                <img alt="profile" src={friend.profile_pic_url} />
                <label style={{ cursor: "pointer" }}>
                    {friend.friend_name}
                </label>
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
                <a
                    onClick={() => {
                        setActiveTab("Friends");
                    }}
                >
                    See all friends
                </a>
            </div>
            <div className="recent-friends-grid">{renderedRecentFriends}</div>
        </div>
    );
}

export default TimelineRecentFriends;

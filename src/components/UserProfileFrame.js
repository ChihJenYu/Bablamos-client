import React from "react";
import "../css/user-profile-frame.css";

function UserProfileFrame({
    username,
    friend_count,
    profile_pic_url,
    cover_pic_url,
    user_relationship,
    activeTab,
    setActiveTab,
}) {
    return (
        <div className="profile-frame-container">
            <div className="profile">
                <div className="profile-head-banner">
                    <img src={profile_pic_url} alt="" className="profile-img" />
                    <div className="profile-name">
                        <div className="profile-username">{username}</div>
                        <div className="profile-frame-friend-count">
                            {friend_count} friends
                        </div>
                    </div>
                    <div className="banner-button"></div>
                </div>
                <img
                    src={
                        cover_pic_url ||
                        "https://nas-national-prod.s3.amazonaws.com/styles/hero_image/s3/christopher-michel_3.jpg?itok=xOygEape"
                    }
                    alt=""
                    className="profile-cover"
                />
                <div className="profile-menu">
                    <a
                        className={`profile-menu-link ${
                            activeTab == "Timeline" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("Timeline")}
                    >
                        Timeline
                    </a>
                    <a
                        className={`profile-menu-link ${
                            activeTab == "Friends" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("Friends")}
                    >
                        Friends
                    </a>
                    <a
                        className={`profile-menu-link ${
                            activeTab == "Photos" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("Photos")}
                    >
                        Photos
                    </a>
                    <a
                        className={`profile-menu-link ${
                            activeTab == "Preferences" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("Preferences")}
                    >
                        Preferences
                    </a>
                </div>
            </div>
        </div>
    );
}

export default UserProfileFrame;

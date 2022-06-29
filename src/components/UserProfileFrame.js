import React from "react";
import "../css/user-profile-frame.css";
import UserProfilePrompts from "./UserProfilePrompts";
const FRIEND_STATUS = ["self", "accepted", "sent", "received", "stranger"];

function UserProfileFrame({
    friend_count,
    activeTab,
    setActiveTab,
    profileUser,
    setProfileUser,
}) {
    return (
        <div className="profile-frame-container">
            <div className="profile">
                <div className="profile-head-banner">
                    <img
                        src={profileUser.profile_pic_url}
                        alt=""
                        className="profile-img"
                    />
                    <div className="profile-name">
                        <div className="profile-username">
                            {profileUser.username}
                        </div>
                        <div className="profile-frame-friend-count">
                            {friend_count} friends
                        </div>
                    </div>
                    <div className="banner-prompts">
                        <UserProfilePrompts
                            user_id={profileUser.user_id}
                            friend_status={profileUser.friend_status}
                            follow_status={profileUser.follow_status}
                            allow_stranger_follow={
                                profileUser.allow_stranger_follow
                            }
                            setProfileUser={setProfileUser}
                        />
                    </div>
                </div>
                <img
                    src={
                        profileUser.cover_pic_url ||
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

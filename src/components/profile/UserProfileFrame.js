import React from "react";
import "../../css/user-profile-frame.css";
import UserProfilePrompts from "./UserProfilePrompts";
const FRIEND_STATUS = ["self", "accepted", "sent", "received", "stranger"];

function UserProfileFrame({
    showEditPrompt,
    friend_count,
    activeTab,
    setActiveTab,
    profileUser,
    setProfileUser,
    setEditModalType,
    setEditModalOpen,
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
                    {showEditPrompt ? (
                        <div className="profile-edit-icon">
                            <i
                                onClick={() => {
                                    setEditModalOpen(true);
                                    setEditModalType({
                                        heading: "Edit Profile Photo",
                                        profile_pic_url:
                                            profileUser.profile_pic_url,
                                        cover_pic_url:
                                            profileUser.cover_pic_url,
                                    });
                                }}
                                className="camera icon"
                            ></i>
                        </div>
                    ) : null}

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
                    src={profileUser.cover_pic_url}
                    alt=""
                    className="profile-cover"
                />
                {showEditPrompt ? (
                    <div className="cover-edit-icon">
                        <i
                            onClick={() => {
                                setEditModalOpen(true);
                                setEditModalType({
                                    heading: "Edit Profile Photo",
                                    profile_pic_url:
                                        profileUser.profile_pic_url,
                                    cover_pic_url: profileUser.cover_pic_url,
                                });
                            }}
                            className="camera icon"
                        ></i>
                    </div>
                ) : null}
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

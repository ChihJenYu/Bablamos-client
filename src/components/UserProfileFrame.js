import React, { useRef } from "react";
import "../css/user-profile-frame.css";
import FloatingOptions from "./FloatingOption";
const FRIEND_STATUS = ["self", "accepted", "sent", "received", "stranger"];

function UserProfileFrame({
    username,
    user_id,
    friend_count,
    profile_pic_url,
    cover_pic_url,
    friend_status,
    activeTab,
    setActiveTab,
}) {
    const followingStatusRef = useRef();
    const friendStatusRef = useRef();

    const onClickUnfollow = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/follow?id=${user_id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        if (res.status == 200) {
            followingStatusRef.current.classList.remove("bablamos-theme");
        }
    };

    const onClickFollow = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/follow?id=${user_id}`,
            {
                method: "POST",
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        if (res.status == 201) {
            followingStatusRef.current.classList.add("bablamos-theme");
        }
    };

    const onClickAcceptFriend = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/friend?user-id=${user_id}&action=accept`,
            {
                method: "POST",
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        if (res.status == 201) {
            friendStatusRef.current.classList.add("bablamos-theme");
        }
    };

    const onClickSendFriend = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/friend?user-id=${user_id}&action=send`,
            {
                method: "POST",
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        if (res.status == 201) {
            friendStatusRef.current.classList.add("bablamos-theme");
        }
    };

    const onClickUnfriend = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/friend?user-id=${user_id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        if (res.status == 200) {
            friendStatusRef.current.classList.remove("bablamos-theme");
        }
    };

    const renderProfilePrompts = (friend_status) => {
        if (friend_status === "self") {
            return (
                <div className="profile-prompts">
                    <div className="ui button bablamos-theme button-group">
                        Edit profile
                    </div>
                </div>
            );
        } else if (friend_status === "accepted") {
            return (
                <div className="profile-prompts">
                    <FloatingOptions
                        defaultComponent={
                            <div
                                className="ui button bablamos-theme"
                                ref={followingStatusRef}
                            >
                                Follow
                            </div>
                        }
                        dropdownComponents={[
                            <div className="item" onClick={onClickUnfollow}>
                                <i className="hide icon" />
                                Unfollow
                            </div>,
                        ]}
                    />
                    <FloatingOptions
                        defaultComponent={
                            <div
                                className="ui button bablamos-theme"
                                ref={friendStatusRef}
                            >
                                Friends
                            </div>
                        }
                        dropdownComponents={[
                            <div className="item" onClick={onClickUnfriend}>
                                <i className="hide icon" />
                                Unfriend
                            </div>,
                        ]}
                    />
                    <div className="ui button button-group bablamos-theme">
                        Message
                    </div>
                </div>
            );
        } else if (friend_status === "sent") {
            return (
                <div className="profile-prompts">
                    <div
                        className="ui button bablamos-theme button-group"
                        ref={followingStatusRef}
                        onClick={onClickFollow}
                    >
                        Follow
                    </div>
                    <FloatingOptions
                        defaultComponent={
                            <div
                                className="ui button bablamos-theme"
                                ref={friendStatusRef}
                            >
                                Request sent
                            </div>
                        }
                        dropdownComponents={[
                            <div className="item" onClick={onClickUnfriend}>
                                <i className="trash alternate red icon" />
                                Revoke
                            </div>,
                        ]}
                    />
                </div>
            );
        } else if (friend_status === "received") {
            return (
                <div className="profile-prompts">
                    <div
                        className="ui button bablamos-theme button-group"
                        ref={followingStatusRef}
                        onClick={onClickFollow}
                    >
                        Follow
                    </div>
                    <FloatingOptions
                        defaultComponent={
                            <div
                                className="ui button bablamos-theme"
                                ref={friendStatusRef}
                                onClick={onClickAcceptFriend}
                            >
                                Confirm request
                            </div>
                        }
                        dropdownComponents={[
                            <div className="item" onClick={onClickUnfriend}>
                                <i className="trash alternate red icon" />
                                Remove
                            </div>,
                        ]}
                    />
                </div>
            );
        } else {
            return (
                <div className="profile-prompts">
                    <div
                        className="ui button bablamos-theme button-group"
                        ref={followingStatusRef}
                        onClick={onClickFollow}
                    >
                        Follow
                    </div>
                    <div
                        className="ui button bablamos-theme button-group"
                        ref={friendStatusRef}
                        onClick={onClickSendFriend}
                    >
                        Add friends
                    </div>
                </div>
            );
        }
    };

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
                    <div className="banner-prompts">
                        {renderProfilePrompts(friend_status)}
                    </div>
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

import React from "react";
import FloatingOptions from "../common/FloatingOption";
import "../../css/user-profile-prompts.css";
import {
    userFollow,
    userUnfollow,
    userAcceptFriend,
    userSendFriend,
    userUnfriend,
} from "../../apis/user";

function UserProfilePrompts({
    user_id,
    friend_status,
    follow_status,
    allow_stranger_follow,
    setProfileUser,
}) {
    const onClickUnfollow = async () => {
        const res = await userUnfollow(
            user_id,
            window.localStorage.getItem("auth")
        );
        if (res.status == 200) {
            setProfileUser((prev) => {
                return { ...prev, follow_status: 0 };
            });
        }
    };

    const onClickFollow = async () => {
        const res = await userFollow(
            user_id,
            window.localStorage.getItem("auth")
        );
        if (res.status == 201) {
            setProfileUser((prev) => {
                return { ...prev, follow_status: 1 };
            });
        }
    };

    const onClickAcceptFriend = async () => {
        const res = await userAcceptFriend(
            user_id,
            window.localStorage.getItem("auth")
        );
        if (res.status == 201) {
            setProfileUser((prev) => {
                return { ...prev, friend_status: "accepted", follow_status: 1 };
            });
        }
    };

    const onClickSendFriend = async () => {
        const res = await userSendFriend(
            user_id,
            window.localStorage.getItem("auth")
        );
        if (res.status == 201) {
            setProfileUser((prev) => {
                return { ...prev, friend_status: "sent" };
            });
        }
    };

    const onClickUnfriend = async () => {
        const res = await userUnfriend(
            user_id,
            window.localStorage.getItem("auth")
        );
        if (res.status == 200) {
            setProfileUser((prev) => {
                return { ...prev, friend_status: "stranger", follow_status: 0 };
            });
        }
    };

    const renderFollowPrompt = () => {
        if (friend_status === "self") {
            return;
        }
        if (follow_status == 0) {
            // not following
            if (friend_status === "accepted" || allow_stranger_follow == 1) {
                return (
                    <div
                        className="ui button bablamos-theme-prompt"
                        onClick={onClickFollow}
                    >
                        Follow
                    </div>
                );
            }
        } else {
            // already following
            return (
                <FloatingOptions
                    type="quiet"
                    defaultComponent={
                        <>
                            <span className="text">Following</span>
                            <i className="dropdown icon"></i>
                        </>
                    }
                    dropdownComponents={[
                        <div className="item" onClick={onClickUnfollow}>
                            <i className="hide icon" />
                            Unfollow
                        </div>,
                    ]}
                />
            );
        }
    };

    const renderFriendPrompt = () => {
        if (friend_status === "accepted") {
            return (
                <>
                    <FloatingOptions
                        type="quiet"
                        defaultComponent={
                            <>
                                <span className="text">Friends</span>
                                <i className="dropdown icon"></i>
                            </>
                        }
                        dropdownComponents={
                            <div className="item" onClick={onClickUnfriend}>
                                <i className="trash alternate icon" />
                                Unfriend
                            </div>
                        }
                    />
                </>
            );
        } else if (friend_status === "sent") {
            return (
                <>
                    <FloatingOptions
                        type="quiet"
                        defaultComponent={
                            <>
                                <span className="text">Request sent</span>
                                <i className="dropdown icon"></i>
                            </>
                        }
                        dropdownComponents={[
                            <div className="item" onClick={onClickUnfriend}>
                                <i className="trash alternate icon" />
                                Revoke
                            </div>,
                        ]}
                    />
                </>
            );
        } else if (friend_status === "received") {
            return (
                <>
                    <div
                        className="ui button bablamos-theme-prompt"
                        onClick={onClickAcceptFriend}
                    >
                        Confirm request
                    </div>
                    <div
                        className="ui button quiet single"
                        onClick={onClickUnfriend}
                    >
                        Decline
                    </div>
                </>
            );
        } else if (friend_status === "stranger") {
            return (
                <div
                    className="ui button bablamos-theme-prompt"
                    onClick={onClickSendFriend}
                >
                    Add friend
                </div>
            );
        }
    };

    const renderMessagePrompt = () => {
        // if (friend_status === "accepted") {
        //     return <div className="ui button quiet single">Message</div>;
        // }
        return null;
    };

    const renderEditProfilePrompt = () => {
        if (friend_status === "self") {
            // return (
            //     <div className="profile-prompts">
            //         <div className="ui button quiet single">Edit profile</div>
            //     </div>
            // );
            return null;
        }
    };

    return (
        <div className="profile-prompts">
            {renderFollowPrompt()}
            {renderFriendPrompt()}
            {renderMessagePrompt()}
            {renderEditProfilePrompt()}
        </div>
    );
}

export default UserProfilePrompts;

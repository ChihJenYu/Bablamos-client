import React, { useEffect, useState } from "react";
import UserProfileFrame from "./UserProfileFrame";
import TimelineTabContent from "./TimelineTabContent";
import FriendsTabContent from "./FriendsTabContent";
import Header from "../header/Header";
import { useParams } from "react-router-dom";
import "../../css/semantic.min.css";
import "../../css/user-profile.css";
import { getUserInfo, getProfileUserInfo } from "../../apis/user";
const TABS = ["Timeline", "Friends", "Photos", "Preferences"];

function UserProfile({ clientSocket, setClientSocket }) {
    const { username: urlUsername } = useParams();
    const [recentFriends, setRecentFriends] = useState([]);
    const [friendCount, setFriendCount] = useState(null);
    const [profileUser, setProfileUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
        user_info: null,
        cover_pic_url: null,
        friend_status: null,
        follow_status: null,
        allow_stranger_follow: null,
    });
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const fetchUserInfo = async () => {
        const json = await getUserInfo(window.localStorage.getItem("auth"));
        setUser(json.data);
        if (clientSocket.user_id !== json.data.user_id) {
            setClientSocket((prev) => {
                return { ...prev, user_id: json.data.user_id };
            });
        }
    };

    const fetchProfileUserInfo = async () => {
        const json = await getProfileUserInfo(
            urlUsername,
            window.localStorage.getItem("auth")
        );
        const {
            user_id,
            user_info,
            username,
            profile_pic_url,
            friend_count,
            recent_friends,
            friend_status,
            follow_status,
            allow_stranger_follow,
        } = json;
        if (profileUser.user_id !== user_id) {
            setRecentFriends(recent_friends);
            setFriendCount(friend_count);
            setProfileUser({
                user_id,
                username,
                profile_pic_url,
                user_info,
                friend_status,
                follow_status,
                allow_stranger_follow,
            });
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        fetchProfileUserInfo();
    }, [profileUser]);

    return (
        <>
            {user.user_id && clientSocket.user_id && profileUser.user_id ? (
                <Header
                    user_id={user.user_id}
                    username={user.username}
                    profile_pic_url={user.profile_pic_url}
                    clientSocket={clientSocket}
                    setClientSocket={setClientSocket}
                    profileUser={profileUser}
                    setProfileUser={setProfileUser}
                ></Header>
            ) : null}
            {profileUser.user_id && clientSocket.user_id ? (
                <div className="user-profile-page">
                    <UserProfileFrame
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        friend_count={friendCount}
                        profileUser={profileUser}
                        setProfileUser={setProfileUser}
                    />
                    {activeTab === "Timeline" ? (
                        <TimelineTabContent
                            user={user}
                            profileUser={profileUser}
                            recentFriends={recentFriends}
                            friendCount={friendCount}
                        />
                    ) : null}
                    {activeTab === "Friends" ? (
                        <FriendsTabContent profileUser={profileUser} />
                    ) : null}
                </div>
            ) : null}
        </>
    );
}

export default UserProfile;

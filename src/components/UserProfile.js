import React, { useEffect, useState } from "react";
import UserProfileFrame from "./UserProfileFrame";
import TimelineTabContent from "./TimelineTabContent";
import FriendsTabContent from "./FriendsTabContent";
import Header from "./Header";
import { useParams } from "react-router-dom";
import "../css/semantic.min.css";
import "../css/user-profile.css";
const TABS = ["Timeline", "Friends", "Photos", "Preferences"];

function UserProfile() {
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
    });
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const fetchUserInfo = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/info?at=index`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            }
        );
        const json = await res.json();
        setUser(json.data);
    };

    const fetchProfileUserInfo = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/info?at=profile&username=${urlUsername}`,
            {
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        const json = await res.json();
        const {
            user_id,
            user_info,
            username,
            profile_pic_url,
            friend_count,
            recent_friends,
            friend_status,
        } = json;
        setRecentFriends(recent_friends);
        setFriendCount(friend_count);
        setProfileUser({
            user_id,
            username,
            profile_pic_url,
            user_info,
            friend_status,
        });
    };

    useEffect(() => {
        fetchUserInfo();
        fetchProfileUserInfo();
    }, []);

    return (
        <>
            <Header
                username={user.username}
                profile_pic_url={user.profile_pic_url}
            ></Header>
            {profileUser.user_id ? (
                <div className="user-profile-page">
                    <UserProfileFrame
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        friend_count={friendCount}
                        user_id={profileUser.user_id}
                        username={profileUser.username}
                        profile_pic_url={profileUser.profile_pic_url}
                        cover_pic_url={profileUser.cover_pic_url}
                        friend_status={profileUser.friend_status}
                    />
                    {activeTab === "Timeline" ? (
                        <TimelineTabContent
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

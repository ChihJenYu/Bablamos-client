import React, { useEffect, useState } from "react";
import UserProfileFrame from "./UserProfileFrame";
import TimelineTabContent from "./TimelineTabContent";
import FriendsTabContent from "./FriendsTabContent";
import Header from "../header/Header";
import { useParams } from "react-router-dom";
import EditModal from "./EditModal";
import NotFound from "../common/NotFound";
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
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editModalType, setEditModalType] = useState({
        heading: null,
        profile_pic_url: null,
        cover_pic_url: null,
    });
    const [textAreaValue, setTextAreaValue] = useState("");
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const json = await getUserInfo(window.localStorage.getItem("auth"));
            setUser(json.data);
            if (clientSocket.user_id !== json.data.user_id) {
                setClientSocket((prev) => {
                    return { ...prev, user_id: json.data.user_id };
                });
            }
        };
        fetchUserInfo();
    }, [clientSocket.user_id]);

    useEffect(() => {
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
                cover_pic_url,
                friend_count,
                recent_friends,
                friend_status,
                follow_status,
                allow_stranger_follow,
            } = json;
            if (!user_id) {
                // user not found
                setUserNotFound(true);
            }
            if (profileUser.user_id !== user_id) {
                setRecentFriends(recent_friends);
                setFriendCount(friend_count);
                setProfileUser({
                    user_id,
                    username,
                    profile_pic_url,
                    cover_pic_url,
                    user_info,
                    friend_status,
                    follow_status,
                    allow_stranger_follow,
                });
            }
        };
        fetchProfileUserInfo();
        // }, [urlUsername, profileUser]);
    }, []);

    useEffect(() => {
        setTextAreaValue(profileUser.user_info);
    }, [profileUser]);

    if (user.user_id && clientSocket.user_id && profileUser.user_id) {
        return (
            <>
                <Header
                    user_id={user.user_id}
                    username={user.username}
                    profile_pic_url={user.profile_pic_url}
                    clientSocket={clientSocket}
                    setClientSocket={setClientSocket}
                    profileUser={profileUser}
                    setProfileUser={setProfileUser}
                ></Header>
                <div className="user-profile-page">
                    <UserProfileFrame
                        showEditPrompt={profileUser.user_id === user.user_id}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        friend_count={friendCount}
                        profileUser={profileUser}
                        setProfileUser={setProfileUser}
                        editModalOpen={editModalOpen}
                        setEditModalType={setEditModalType}
                        setEditModalOpen={setEditModalOpen}
                    />
                    {editModalOpen ? (
                        <EditModal
                            editModalType={editModalType}
                            setVisible={setEditModalOpen}
                            textAreaValue={textAreaValue}
                            setTextAreaValue={setTextAreaValue}
                            profileUser={profileUser}
                            setProfileUser={setProfileUser}
                            setUser={setUser}
                        />
                    ) : null}
                    {activeTab === "Timeline" ? (
                        <TimelineTabContent
                            showEditPrompt={
                                profileUser.user_id === user.user_id
                            }
                            user={user}
                            profileUser={profileUser}
                            recentFriends={recentFriends}
                            friendCount={friendCount}
                            setEditModalType={setEditModalType}
                            editModalOpen={editModalOpen}
                            setEditModalOpen={setEditModalOpen}
                            setActiveTab={setActiveTab}
                        />
                    ) : null}
                    {activeTab === "Friends" ? (
                        <FriendsTabContent profileUser={profileUser} />
                    ) : null}
                </div>
            </>
        );
    }

    if (userNotFound) {
        return (
            <>
                <Header
                    user_id={user.user_id}
                    username={user.username}
                    profile_pic_url={user.profile_pic_url}
                    clientSocket={clientSocket}
                    setClientSocket={setClientSocket}
                    profileUser={profileUser}
                    setProfileUser={setProfileUser}
                ></Header>
                <div className="user-profile-page">
                    <NotFound />
                </div>
            </>
        );
    }
}

export default UserProfile;

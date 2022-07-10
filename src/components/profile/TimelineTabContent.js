import React, { useState, useEffect } from "react";
import TimelineUserInfo from "./TimelineUserInfo";
import TimelineRecentFriends from "./TimelineRecentFriends";
import Newsfeed from "../newsfeed/Newsfeed";
import "../../css/timeline-tab-content.css";
import { getProfilePosts } from "../../apis/post";

function TimelineTabContent({
    showEditPrompt,
    user,
    profileUser,
    recentFriends,
    friendCount,
    setEditModalType,
    editModalOpen,
    setEditModalOpen,
    setActiveTab
}) {
    const [posts, setPosts] = useState([]);
    const [postsPaging, setPostsPaging] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);

    const fetchPosts = async () => {
        const json = await getProfilePosts(
            profileUser.user_id,
            postsPaging,
            window.localStorage.getItem("auth")
        );
        if (json.data.length === 0) {
            setHasReachedEnd(true);
            return;
        }
        setPostsPaging(postsPaging + 1);
        setPosts((prev) => [...prev, ...json.data]);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <div className="profile-tab-left-menus">
                <TimelineUserInfo
                    showEditPrompt={showEditPrompt}
                    userInfo={profileUser.user_info}
                    setEditModalType={setEditModalType}
                    editModalOpen={editModalOpen}
                    setEditModalOpen={setEditModalOpen}
                />

                {recentFriends.length > 0 ? (
                    <TimelineRecentFriends
                        recentFriends={recentFriends}
                        friendCount={friendCount}
                        setActiveTab={setActiveTab}
                    />
                ) : null}
            </div>
            <div className="profile-news-feed-container">
                <div className="profile-news-feed">
                    <Newsfeed
                        user_id={user.user_id}
                        profile_pic_url={profileUser.profile_pic_url}
                        posts={posts}
                        setPosts={setPosts}
                        fetchPosts={fetchPosts}
                        hasReachedEnd={hasReachedEnd}
                        endMessage={
                            <p
                                className="end-message"
                                style={{ textAlign: "center" }}
                            >
                                That's all of 'em!
                            </p>
                        }
                    />
                </div>
            </div>
        </>
    );
}

export default TimelineTabContent;

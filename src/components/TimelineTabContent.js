import React, { useState, useEffect } from "react";
import TimelineUserInfo from "./TimelineUserInfo";
import TimelineRecentFriends from "./TimelineRecentFriends";
import Newsfeed from "./Newsfeed";
import "../css/timeline-tab-content.css";

function TimelineTabContent({ user, profileUser, recentFriends, friendCount }) {
    const [posts, setPosts] = useState([]);
    const [postsPaging, setPostsPaging] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);

    const fetchPosts = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/newsfeed?at=profile&id=${profileUser.user_id}&paging=${postsPaging}`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            }
        );
        const json = await res.json();
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
                <TimelineUserInfo userInfo={profileUser.user_info} />

                {recentFriends.length > 0 ? (
                    <TimelineRecentFriends
                        recentFriends={recentFriends}
                        friendCount={friendCount}
                    />
                ) : null}
            </div>
            <div className="profile-news-feed-container">
                <div className="profile-news-feed">
                    <Newsfeed
                        user_id={user.user_id}
                        profile_pic_url={profileUser.profile_pic_url}
                        posts={posts}
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

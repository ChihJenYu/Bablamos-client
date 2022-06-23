import React, { useState, useEffect } from "react";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileRecentFriends from "./ProfileRecentFriends";
import Newsfeed from "./Newsfeed";
import "../css/timeline-tab-content.css";

function TimelineTabContent({ user, recentFriends, friendCount }) {
    const [posts, setPosts] = useState([]);

    const [postsPaging, setPostsPaging] = useState(0);

    const fetchPosts = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/newsfeed?at=profile&paging=${postsPaging}`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            }
        );
        const json = await res.json();
        setPostsPaging(postsPaging + 1);
        setPosts((prev) => [...prev, ...json.data]);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <div className="profile-tab-content">
                <div className="tab-content-container">
                    <div className="profile-tab-left-menus">
                        <ProfileUserInfo userInfo={user.user_info} />

                        {recentFriends.length > 0 ? (
                            <ProfileRecentFriends
                                recentFriends={recentFriends}
                                friendCount={friendCount}
                            />
                        ) : null}
                    </div>
                    <div className="profile-news-feed">
                        <Newsfeed
                            profile_pic_url={user.profile_pic_url}
                            posts={posts}
                            fetchPosts={fetchPosts}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TimelineTabContent;

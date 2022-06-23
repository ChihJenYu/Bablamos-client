import React, { useState, useEffect } from "react";
import VerticalMenu from "./VerticalMenu";
import Header from "./Header";
import Newsfeed from "./Newsfeed";
import "../css/homepage.css";
import "../css/semantic.min.css";

function Homepage() {
    const [posts, setPosts] = useState([]);
    const [postsPaging, setPostsPaging] = useState(0);
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });

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

    const fetchPosts = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/newsfeed?at=index&paging=${postsPaging}`,
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
        fetchUserInfo();
    }, []);

    return user.user_id ? (
        <div>
            <Header
                username={user.username}
                profile_pic_url={user.profile_pic_url}
            />
            <VerticalMenu username={user.username} />
            <div className="index-news-feed">
                <Newsfeed
                    profile_pic_url={user.profile_pic_url}
                    posts={posts}
                    fetchPosts={fetchPosts}
                />
            </div>
        </div>
    ) : null;
}

export default Homepage;

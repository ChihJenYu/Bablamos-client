import React, { useState, useEffect } from "react";
import VerticalMenu from "./VerticalMenu";
import Header from "./Header";
import Newsfeed from "./Newsfeed";
import "../css/homepage.css";
import "../css/semantic.min.css";

function Homepage({ clientSocket, setClientSocket }) {
    const [posts, setPosts] = useState([]);
    const [postsPaging, setPostsPaging] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
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
        if (clientSocket.user_id !== json.data.user_id) {
            setClientSocket((prev) => {
                return { ...prev, user_id: json.data.user_id };
            });
        }
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
        if (json.data.length === 0) {
            setHasReachedEnd(true);
            return;
        }
        setPostsPaging(postsPaging + 1);
        setPosts((prev) => [...prev, ...json.data]);
    };

    useEffect(() => {
        fetchPosts();
        fetchUserInfo();
    }, []);

    return user.user_id && clientSocket.user_id ? (
        <div>
            <Header
                user_id={user.user_id}
                username={user.username}
                profile_pic_url={user.profile_pic_url}
                clientSocket={clientSocket}
                setClientSocket={setClientSocket}
            />
            <VerticalMenu username={user.username} />
            <div className="index-news-feed">
                <Newsfeed
                    user_id={user.user_id}
                    profile_pic_url={user.profile_pic_url}
                    posts={posts}
                    setPosts={setPosts}
                    fetchPosts={fetchPosts}
                    hasReachedEnd={hasReachedEnd}
                    endMessage={
                        <p style={{ textAlign: "center", marginBottom: "1em" }}>
                            <b>Nani (´ﾟдﾟ`) ... You've seen it all!</b>
                        </p>
                    }
                    type="index"
                    clientSocket={clientSocket}
                    setClientSocket={setClientSocket}
                />
            </div>
        </div>
    ) : null;
}

export default Homepage;

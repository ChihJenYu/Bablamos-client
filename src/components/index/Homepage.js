import React, { useState, useEffect } from "react";
import HomepageFrame from "./HomepageFrame";
import Newsfeed from "../newsfeed/Newsfeed";
import "../../css/homepage.css";
import "../../css/semantic.min.css";
import { getIndexPosts } from "../../apis/post";
import { getUserInfo } from "../../apis/user";

function Homepage({ clientSocket, setClientSocket }) {
    const [posts, setPosts] = useState([]);
    const [postsPaging, setPostsPaging] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });

    const fetchPosts = async () => {
        const json = await getIndexPosts(
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

    const fetchUserInfo = async () => {
        const json = await getUserInfo(window.localStorage.getItem("auth"));
        setUser(json.data);
        if (clientSocket.user_id !== json.data.user_id) {
            setClientSocket((prev) => {
                return { ...prev, user_id: json.data.user_id };
            });
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchUserInfo();
    }, []);

    return user.user_id && clientSocket.user_id ? (
        <div>
            <HomepageFrame
                user={user}
                clientSocket={clientSocket}
                setClientSocket={setClientSocket}
            />
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
                />
            </div>
        </div>
    ) : null;
}

export default Homepage;

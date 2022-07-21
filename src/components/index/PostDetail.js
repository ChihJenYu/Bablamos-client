import React, { useState, useEffect } from "react";
import Newsfeed from "../newsfeed/Newsfeed";
import { useParams } from "react-router-dom";
import "../../css/semantic.min.css";
import { getUserInfo } from "../../apis/user";
import { getPostDetail } from "../../apis/post";
import HomepageFrame from "./HomepageFrame";
import NotFound from "../common/NotFound";

function PostDetail({ clientSocket, setClientSocket }) {
    const { postId } = useParams();
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });
    const [posts, setPosts] = useState([]);
    const [postNotFound, setPostNotFound] = useState(false);

    const fetchUserInfo = async () => {
        const json = await getUserInfo(window.localStorage.getItem("auth"));
        setUser(json.data);
        if (clientSocket.user_id !== json.data.user_id) {
            setClientSocket((prev) => {
                return { ...prev, user_id: json.data.user_id };
            });
        }
    };

    const fetchPostDetail = async () => {
        const json = await getPostDetail(
            postId,
            window.localStorage.getItem("auth")
        );
        if (!json.data) {
            setPostNotFound(true);
        }
        setPosts([json.data]);
    };

    useEffect(() => {
        fetchUserInfo();
        fetchPostDetail();
    }, [postId]);

    if (user.user_id && clientSocket.user_id && posts[0]) {
        return (
            <div>
                <HomepageFrame
                    user={user}
                    clientSocket={clientSocket}
                    setClientSocket={setClientSocket}
                />
                <div className="index-news-feed detail">
                    <Newsfeed
                        user_id={user.user_id}
                        profile_pic_url={user.profile_pic_url}
                        posts={posts}
                        setPosts={setPosts}
                        fetchPosts={fetchPostDetail}
                        hasReachedEnd={true}
                        type="detail"
                        clientSocket={clientSocket}
                        setClientSocket={setClientSocket}
                    />
                </div>
            </div>
        );
    }
    if (postNotFound) {
        return (
            <div>
                <HomepageFrame
                    notFound={true}
                    user={user}
                    clientSocket={clientSocket}
                    setClientSocket={setClientSocket}
                />
                <div
                    className="index-news-feed detail post-not-found"
                >
                    <NotFound />
                </div>
            </div>
        );
    }
}

export default PostDetail;

import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import VerticalMenu from "../common/VerticalMenu";
import Newsfeed from "../newsfeed/Newsfeed";
import { useParams } from "react-router-dom";
import "../../css/semantic.min.css";
import { getUserInfo } from "../../apis/user";
import { getPostDetail } from "../../apis/post";

function PostDetail({ clientSocket, setClientSocket }) {
    const { postId } = useParams();
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });
    const [post, setPost] = useState({});

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
        setPost(json.data);
    };

    useEffect(() => {
        fetchUserInfo();
        fetchPostDetail();
    }, [postId]);

    return user.user_id && clientSocket.user_id && post.id ? (
        <div>
            <Header
                user_id={user.user_id}
                username={user.username}
                profile_pic_url={user.profile_pic_url}
                clientSocket={clientSocket}
                setClientSocket={setClientSocket}
            />
            <VerticalMenu username={user.username} />
            <div className="index-news-feed detail">
                <Newsfeed
                    user_id={user.user_id}
                    profile_pic_url={user.profile_pic_url}
                    posts={[post]}
                    fetchPosts={fetchPostDetail}
                    hasReachedEnd={true}
                    type="detail"
                    clientSocket={clientSocket}
                    setClientSocket={setClientSocket}
                />
            </div>
        </div>
    ) : null;
}

export default PostDetail;

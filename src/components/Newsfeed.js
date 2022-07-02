import React, { useState, useEffect } from "react";
import InputModal from "./InputModal";
import TagSelectionModal from "./TagSelectionModal";
import InputModalPrompt from "./InputModalPrompt";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import { uniq } from "lodash-es";

function Newsfeed({
    user_id,
    profile_pic_url,
    posts,
    fetchPosts,
    hasReachedEnd,
    endMessage,
    type,
    clientSocket,
    setClientSocket,
}) {
    const [showInputModal, setShowInputModal] = useState(false);
    const [seenPosts, setSeenPosts] = useState([]);
    const [seenFreshPosts, setSeenFreshPosts] = useState([]);

    useEffect(() => {
        const readPosts = () => {
            fetch("http://localhost:3000/api/user/read?type=read", {
                method: "POST",
                keepalive: true,
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    posts: uniq(seenPosts),
                }),
            });
        };

        if (type === "index") {
            window.addEventListener("beforeunload", readPosts);

            return () => {
                window.removeEventListener("beforeunload", readPosts);
            };
        }
    }, [seenPosts]);

    useEffect(() => {
        const readFreshPosts = () => {
            fetch("http://localhost:3000/api/user/read?type=new", {
                method: "POST",
                keepalive: true,
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    posts: uniq(seenFreshPosts),
                }),
            });
        };

        if (type === "index") {
            window.addEventListener("beforeunload", readFreshPosts);

            return () => {
                window.removeEventListener("beforeunload", readFreshPosts);
            };
        }
    }, [seenFreshPosts]);

    const renderedPosts = posts.map((post) => {
        return (
            <Post
                key={post.id}
                id={post.id}
                user_id={post.user_id}
                username={post.username}
                profile_pic_url={post.profile_pic_url}
                shared_post_id={post.shared_post_id}
                created_at={post.created_at}
                content={post.content}
                tags={post.tags}
                is_new={post.is_new}
                like_count={post.like_count}
                comment_count={post.comment_count}
                latest_comments={post.latest_comments}
                share_count={post.share_count}
                replier_user_id={user_id}
                replier_profile_pic_url={profile_pic_url}
                audience_type={post.audience_type}
                mentioned_users={post.mentioned_users}
                photo_urls={post.photo_urls}
                already_liked={post.already_liked}
                setSeenFreshPosts={setSeenFreshPosts}
                setSeenPosts={setSeenPosts}
                clientSocket={clientSocket}
                setClientSocket={setClientSocket}
                type={type}
            />
        );
    });

    return (
        <>
            {type !== "detail" ? (
                <>
                    <InputModalPrompt setVisible={setShowInputModal} />
                    {showInputModal ? (
                        <InputModal
                            visible={showInputModal}
                            setVisible={setShowInputModal}
                            clientSocket={clientSocket}
                            setClientSocket={setClientSocket}
                        />
                    ) : null}
                </>
            ) : null}

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={!hasReachedEnd}
                loader={<Loader text="Loading" />}
                endMessage={endMessage}
            >
                {renderedPosts}
            </InfiniteScroll>
        </>
    );
}

export default Newsfeed;

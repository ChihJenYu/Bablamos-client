import React, { useState, useEffect } from "react";
import InputModal from "./InputModal";
import InputModalPrompt from "./InputModalPrompt";
import Post from "../post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../common/Loader";
import { uniq } from "lodash-es";
import { userSeePosts, userSeeFreshPosts } from "../../apis/user";
function Newsfeed({
    user_id,
    profile_pic_url,
    posts,
    setPosts,
    fetchPosts,
    hasReachedEnd,
    endMessage,
    type,
}) {
    const [showInputModal, setShowInputModal] = useState(false);
    const [seenPosts, setSeenPosts] = useState([]);
    const [seenFreshPosts, setSeenFreshPosts] = useState([]);
    const [textAreaValue, setTextAreaValue] = useState("");
    const [inputModalType, setInputModalType] = useState({
        heading: "Create Post",
        post_id: null,
    });

    useEffect(() => {
        const readPosts = () => {
            userSeePosts(uniq(seenPosts), window.localStorage.getItem("auth"));
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
            userSeeFreshPosts(
                uniq(seenFreshPosts),
                window.localStorage.getItem("auth")
            );
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
                shared_post_data={post.shared_post_data}
                created_at={post.created_at}
                content={post.content}
                tags={post.tags}
                like_count={post.like_count}
                comment_count={post.comment_count}
                latest_comments={post.latest_comments}
                comments_next_paging={post.comments_next_paging}
                share_count={post.share_count}
                replier_user_id={user_id}
                replier_profile_pic_url={profile_pic_url}
                audience_type={post.audience_type}
                mentioned_users={post.mentioned_users}
                photo_urls={post.photo_urls}
                already_liked={post.already_liked}
                setSeenFreshPosts={setSeenFreshPosts}
                setSeenPosts={setSeenPosts}
                type={type}
                setShowInputModal={setShowInputModal}
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
                setInputModalType={setInputModalType}
            />
        );
    });

    return (
        <>
            {type === "index" || type === "my-profile" ? (
                <>
                    <InputModalPrompt setVisible={setShowInputModal} />
                </>
            ) : null}
            {showInputModal ? (
                <InputModal
                    inputModalType={inputModalType}
                    setInputModalType={setInputModalType}
                    visible={showInputModal}
                    setVisible={setShowInputModal}
                    textAreaValue={textAreaValue}
                    setTextAreaValue={setTextAreaValue}
                    setPosts={setPosts}
                />
            ) : null}
            {posts.length === 0 && hasReachedEnd && type === "index" ? (
                <p style={{ textAlign: "center", marginBottom: "1em" }}>
                    <b>Seeing nothing? Go ahead, make some friends! </b>
                </p>
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={!hasReachedEnd}
                    loader={<Loader text="Loading" />}
                    endMessage={endMessage}
                >
                    {renderedPosts}
                </InfiniteScroll>
            )}
        </>
    );
}

export default Newsfeed;

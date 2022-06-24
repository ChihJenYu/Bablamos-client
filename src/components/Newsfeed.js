import React, { useState } from "react";
import InputModal from "./InputModal";
import TagSelectionModal from "./TagSelectionModal";
import InputModalPrompt from "./InputModalPrompt";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

function Newsfeed({
    profile_pic_url,
    posts,
    fetchPosts,
    hasReachedEnd,
    endMessage,
}) {
    const [showInputModal, setShowInputModal] = useState(false);

    const renderedPosts = posts.map((post) => {
        return (
            <Post
                key={post.id}
                id={post.id}
                audience_type={post.audience_type}
                comment_count={post.comment_count}
                content={post.content}
                created_at={post.created_at}
                latest_comments={post.latest_comments}
                like_count={post.like_count}
                mentioned_users={post.mentioned_users}
                photo_urls={post.photo_urls}
                profile_pic_url={post.profile_pic_url}
                share_count={post.share_count}
                shared_post_id={post.shared_post_id}
                tags={post.tags}
                user_id={post.user_id}
                username={post.username}
                replier_profile_pic_url={profile_pic_url}
            />
        );
    });

    return (
        <>
            <InputModalPrompt setVisible={setShowInputModal} />
            {showInputModal ? (
                <InputModal
                    visible={showInputModal}
                    setVisible={setShowInputModal}
                />
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

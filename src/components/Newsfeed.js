import React, { useState, useEffect } from "react";
import Header from "./Header";
import InputModal from "./InputModal";
import TagSelectionModal from "./TagSelectionModal";
import InputModalPrompt from "./InputModalPrompt";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import VerticalMenu from "./VerticalMenu";
import Loader from "./Loader";
import "../css/newsfeed.css";

function Newsfeed() {
    const [showInputModal, setShowInputModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });
    const [postsPaging, setPostsPaging] = useState(0);

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

    // fetch newsfeed and index page user info
    useEffect(() => {
        fetchPosts();
        fetchUserInfo();
    }, []);

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
                replier_profile_pic_url={user.profile_pic_url}
            />
        );
    });

    return (
        <div>
            <Header
                username={user.username}
                profile_pic_url={user.profile_pic_url}
            />
            <div className="left-vertical-menu">
                <VerticalMenu username={user.username} />
            </div>
            <div className="news-feed">
                <InputModalPrompt setVisible={setShowInputModal} />
                {showInputModal ? (
                    <InputModal
                        visible={showInputModal}
                        setVisible={setShowInputModal}
                    />
                ) : // <TagSelectionModal visible={showInputModal} setVisible={setShowInputModal}/>
                null}
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={true}
                    loader={
                        <Loader text="Loading" />
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Nani (´ﾟдﾟ`) ... You've seen it all!</b>
                        </p>
                    }
                >
                    {renderedPosts}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Newsfeed;

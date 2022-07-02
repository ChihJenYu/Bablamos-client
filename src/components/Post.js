import React, { useState } from "react";
import { InView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import "../css/post.css";
import Comment from "./Comment";
import EdgeInfo from "./EdgeInfo";
import InputInline from "./InputInline";
import LikeAction from "./LikeAction";
import CommentAction from "./CommentAction";
import MeatballMenu from "./MeatballMenu";
function Post({
    id,
    user_id,
    username,
    profile_pic_url,
    shared_post_id,
    created_at,
    content,
    tags,
    is_new,
    like_count,
    comment_count,
    latest_comments,
    share_count,
    replier_user_id,
    replier_profile_pic_url,
    already_liked,
    setSeenFreshPosts,
    setSeenPosts,
    type,
}) {
    const [hasLiked, setHasLiked] = useState(already_liked || 0);
    const [likeCount, setLikeCount] = useState(like_count);
    const [commentCount, setCommentCount] = useState(comment_count);
    const [latestComments, setLatestComments] = useState(latest_comments);

    const renderedTags = tags.map((tag) => {
        return <div key={tag.id}>#{tag.tag_name}</div>;
    });

    const renderedComments = latestComments.map((comment) => {
        return (
            <Comment
                key={comment.id}
                id={comment.id}
                user_id={comment.user_id}
                username={comment.username}
                profile_pic_url={comment.profile_pic_url}
                content={comment.content}
                created_at={comment.created_at}
            />
        );
    });

    return (
        <div className="post">
            <div className="post-head">
                <EdgeInfo
                    user_id={user_id}
                    username={username}
                    profile_pic_url={profile_pic_url}
                    shared_post_id={shared_post_id}
                    created_at={created_at}
                />
                <MeatballMenu
                    replier_user_id={replier_user_id}
                    user_id={user_id}
                    username={username}
                />
            </div>
            <InView
                as="div"
                className="post-preview"
                threshold={1}
                onChange={(inView) => {
                    if (!inView) return;
                    if (is_new) {
                        setSeenFreshPosts((prev) => [...prev, id]);
                    } else {
                        setSeenPosts((prev) => [...prev, id]);
                    }
                }}
                delay={1000}
            >
                <ReactMarkdown>{content}</ReactMarkdown>
            </InView>

            <div className="tags">{renderedTags}</div>
            <div className="popularity-cta">
                <div className="like cta">
                    <LikeAction
                        hasLiked={hasLiked}
                        setHasLiked={setHasLiked}
                        edge={{ post_id: id }}
                        likeCount={likeCount}
                        setLikeCount={setLikeCount}
                    />
                </div>
                <div className="comment cta">
                    <CommentAction
                        postId={id}
                        commentCount={commentCount}
                        setCommentCount={setCommentCount}
                    />
                </div>
                <div className="share cta">
                    <i className="share icon" />
                    {share_count}
                </div>
            </div>
            <div className="comment-viewport">
                <div className="ui comments">
                    {renderedComments}
                    <InputInline
                        postId={id}
                        profile_pic_url={replier_profile_pic_url}
                        setCommentCount={setCommentCount}
                        setLatestComments={setLatestComments}
                    />
                </div>
            </div>
        </div>
    );
}

export default Post;

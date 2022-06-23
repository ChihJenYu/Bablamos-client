import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../css/post.css";
import CommentComponent from "./Comment";
import EdgeInfo from "./EdgeInfo";
import InputInline from "./InputInline";
import LikeAction from "./LikeAction";
import CommentAction from "./CommentAction";
function Post({
    id,
    user_id,
    username,
    profile_pic_url,
    shared_post_id,
    created_at,
    content,
    tags,
    like_count,
    comment_count,
    latest_comments,
    share_count,
    replier_profile_pic_url,
    liked,
}) {
    const EDGE_TYPE = "eventful_edge";

    const [hasLiked, setHasLiked] = useState(liked || false);
    const [likeCount, setLikeCount] = useState(like_count);
    const [commentCount, setCommentCount] = useState(comment_count);
    const [latestComments, setLatestComments] = useState(latest_comments);

    const renderedTags = tags.map((tag) => {
        return <div key={tag.id}>#{tag.tag_name}</div>;
    });

    // let latestCommentsOrdered = latestComments;

    // latestCommentsOrdered.sort(
    //     (comment1, comment2) => comment1.created_at - comment2.created_at
    // );

    const renderedComments = latestComments.map((comment) => {
        return (
            <CommentComponent
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
                <i className="ellipsis horizontal icon"></i>
            </div>
            <div className="post-preview">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <div className="tags">{renderedTags}</div>
            <div className="popularity-cta">
                <div className="like cta">
                    <LikeAction
                        hasLiked={hasLiked}
                        setHasLiked={setHasLiked}
                        edge={{ edge_id: id, edge_type: EDGE_TYPE }}
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

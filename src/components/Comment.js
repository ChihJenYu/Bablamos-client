import React, { useState, useRef } from "react";
import moment from "moment";
import LikeAction from "./LikeAction";
import MentionRender from "./MentionRender";
import history from "../history";
import "../css/comment.css";

function Comment({
    id,
    user_id,
    username,
    profile_pic_url,
    content,
    created_at,
    already_liked,
    like_count,
    setInput,
}) {
    const commentRef = useRef();
    const [hasLiked, setHasLiked] = useState(already_liked || 0);
    const [likeCount, setLikeCount] = useState(like_count || 0);

    const onCommentIconClick = () => {
        const inputField =
            commentRef.current.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".input-inline .content .single-line_mentions__control__hegso input"
            );

        inputField.focus();
        setInput(`@[${username}](${user_id})`);
    };

    return (
        <div className="comment">
            <a
                className="avatar"
                onClick={() => {
                    history.push(`/profile/${username}`);
                }}
            >
                <img src={profile_pic_url} />
            </a>
            <div className="content">
                <a
                    onClick={() => {
                        history.push(`/profile/${username}`);
                    }}
                    className="author"
                >
                    {username}
                </a>
                <div className="metadata">
                    <div className="date">
                        {moment.unix(+created_at).fromNow()}
                    </div>
                </div>
                <div className="text">
                    <MentionRender comment={content} />
                </div>
                <div className="actions">
                    <div className="comment-like-cta">
                        <LikeAction
                            hasLiked={hasLiked}
                            setHasLiked={setHasLiked}
                            edge={{ comment_id: id }}
                            likeCount={likeCount}
                            setLikeCount={setLikeCount}
                            type="comment"
                        />
                    </div>

                    <i
                        ref={commentRef}
                        onClick={onCommentIconClick}
                        className="comment outline icon"
                    />
                </div>
            </div>
        </div>
    );
}

export default Comment;

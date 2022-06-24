import React, { useState } from "react";
import moment from "moment";
import LikeAction from "./LikeAction";
import history from "../history";
import "../css/comment.css";

function Comment({
    id,
    user_id,
    username,
    profile_pic_url,
    content,
    created_at,
    liked,
}) {
    const EDGE_TYPE = "comment";

    const [hasLiked, setHasLiked] = useState(liked || false);

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
                    class="author"
                >
                    {username}
                </a>
                <div className="metadata">
                    <div className="date">
                        {moment.unix(+created_at).fromNow()}
                    </div>
                </div>
                <div className="text">{content}</div>
                <div className="actions">
                    <LikeAction
                        hasLiked={hasLiked}
                        setHasLiked={setHasLiked}
                        edge={{ edge_id: id, edge_type: EDGE_TYPE }}
                    />
                    <i className="comment outline icon" />
                </div>
            </div>
        </div>
    );
}

export default Comment;

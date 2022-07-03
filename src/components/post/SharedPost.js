import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import EdgeInfo from "./EdgeInfo";
import "../../css/shared-post.css";
function SharedPost({
    id,
    user_id,
    username,
    profile_pic_url,
    created_at,
    content,
}) {
    const edgeInfo = useRef();

    return (
        <div className="shared-post-preview">
            <EdgeInfo
                ref={edgeInfo}
                user_id={user_id}
                username={username}
                profile_pic_url={profile_pic_url}
                created_at={created_at}
            />
            <div className="post-preview">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}

export default SharedPost;

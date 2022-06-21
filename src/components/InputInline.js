import React, { useState } from "react";
import "../css/input-inline.css";

function InputInline({
    postId,
    profile_pic_url,
    setCommentCount,
    setLatestComments,
}) {
    const [input, setInput] = useState("");

    const onInputChange = (e) => {
        setInput(e.target.value);
    };

    const onSendClick = () => {
        const postComment = async () => {
            setInput("");
            const res = await fetch(
                `http://localhost:3000/api/comment?post-id=${postId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: window.localStorage.getItem("auth"),
                    },
                    body: JSON.stringify({
                        content: input,
                        level: 1,
                    }),
                }
            );

            // json looks like {comment_id, created_at_unix}
            const json = await res.json();
            setCommentCount((prev) => prev + 1);
            setLatestComments((prev) => [...prev, { ...json, content: input }]);
        };
        postComment();
    };

    return (
        <div className="comment input-inline">
            <a className="avatar">
                <img alt="profile" src={profile_pic_url} />
            </a>
            <div className="content">
                <div className="ui input">
                    <input type="text" value={input} onChange={onInputChange} />
                    <i className="paper plane icon" onClick={onSendClick} />
                </div>
            </div>
        </div>
    );
}

export default InputInline;

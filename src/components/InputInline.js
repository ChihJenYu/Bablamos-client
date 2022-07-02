import React, { useState, useEffect } from "react";
import SingleLine from "./SingleLine";
import parseMention from "../utils/parse-mention";
import "../css/input-inline.css";

function InputInline({
    postId,
    profile_pic_url,
    setCommentCount,
    setLatestComments,
    input,
    setInput,
}) {
    // const [input, setInput] = useState("@[Carl](522)");

    const onInputChange = (e) => {
        setInput(e.target.value);
    };
    const onSendClick = () => {
        const postComment = async () => {
            if (input === "") {
                return;
            }
            const { mentionedUsers } = parseMention(input);
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
                        mentioned_users: mentionedUsers.map((user) => user.id),
                    }),
                }
            );

            // json looks like {comment_id, created_at_unix}
            const json = await res.json();
            setCommentCount((prev) => prev + 1);
            setLatestComments((prev) => [...prev, { ...json, content: input }]);
            setInput("");
        };
        postComment();
    };

    return (
        <div className="comment input-inline">
            <a className="avatar">
                <img alt="profile" src={profile_pic_url} />
            </a>
            <div className="content">
                <SingleLine value={input} onChange={onInputChange} />
            </div>
            <i className="paper plane icon" onClick={onSendClick} />
        </div>
    );
}

export default InputInline;

import React, { useState, useEffect } from "react";
import SingleLine from "./SingleLine";
import parseMention from "../../utils/parse-mention";
import "../../css/input-inline.css";
import { createComment } from "../../apis/comment";

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
            const json = await createComment(
                {
                    content: input,
                    mentioned_users: mentionedUsers.map((user) => user.id),
                },
                postId,
                window.localStorage.getItem("auth")
            );
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

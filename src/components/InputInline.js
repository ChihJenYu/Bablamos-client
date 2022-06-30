import React, { useState, useEffect } from "react";
import SingleLine from "./SingleLine";
import "../css/input-inline.css";

function InputInline({
    postId,
    profile_pic_url,
    setCommentCount,
    setLatestComments,
}) {
    const users = [
        {
            id: "pipilu",
            display: "皮皮鲁",
        },
        {
            id: "luxixi",
            display: "鲁西西",
        },
        {
            id: "satoshi1",
            display: "中本聪",
        },
        {
            id: "satoshi2",
            display: "サトシ・ナカモト",
        },
        {
            id: "nobi",
            display: "野比のび太",
        },
        {
            id: "sung",
            display: "성덕선",
        },
        {
            id: "jesse",
            display: "Jesse Pinkman",
        },
        {
            id: "gus",
            display: 'Gustavo "Gus" Fring',
        },
        {
            id: "saul",
            display: "Saul Goodman",
        },
        {
            id: "hank",
            display: "Hank Schrader",
        },
        {
            id: "skyler",
            display: "Skyler White",
        },
        {
            id: "mike",
            display: "Mike Ehrmantraut",
        },
        {
            id: "lydia",
            display: "Lydìã Rôdarté-Qüayle",
        },
    ];
    const [input, setInput] = useState("");

    const onInputChange = (e) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        console.log(input);
    }, [input]);

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
                    {/* <input type="text" value={input} onChange={onInputChange} /> */}

                    {/* <i className="paper plane icon" onClick={onSendClick} /> */}
                </div>
                <SingleLine
                    value={input}
                    onChange={onInputChange}
                    data={users}
                />
            </div>
        </div>
    );
}

export default InputInline;

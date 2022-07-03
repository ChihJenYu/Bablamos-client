import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import SharedPost from "./SharedPost";
import "../css/input-modal.css";

const InputModal = ({
    inputModalType,
    setInputModalType,
    visible,
    setVisible,
    textAreaValue,
    setTextAreaValue,
    setPosts,
}) => {
    const [atPreview, setAtPreview] = useState(false);

    const fieldRef = useRef();
    const textAreaRef = useRef();

    const renderFormContent = () => {
        if (atPreview) {
            return (
                <div className="markdown-viewport">
                    <ReactMarkdown>{textAreaValue}</ReactMarkdown>
                </div>
            );
        }
        return (
            <textarea
                placeholder="What's on your mind?"
                id="post-input-textarea"
                ref={textAreaRef}
                value={textAreaValue}
                onChange={onTextAreaChange}
                onInput={() => {
                    textAreaRef.current.style.height =
                        textAreaRef.current.scrollHeight + "px";
                }}
                onFocus={() => {
                    textAreaRef.current.style.height =
                        textAreaRef.current.scrollHeight + "px";
                }}
            ></textarea>
        );
    };

    const onTextAreaChange = (e) => {
        setTextAreaValue(e.target.value);
    };

    const onPostSubmit = async () => {
        if (textAreaValue === "") {
            return;
        }
        const tags = Array.from(
            document.querySelectorAll(".multiple.selection.search a.ui.label")
        );
        const tagIds = tags.map((tag) => {
            return {
                tag_id: +tag.attributes.value.nodeValue,
                tag_name: tag.firstChild.data,
            };
        });

        if (
            inputModalType.heading === "Create Post" ||
            inputModalType.heading === "Share Post"
        ) {
            await fetch("http://localhost:3000/api/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("auth"),
                },
                body: JSON.stringify({
                    content: textAreaValue,
                    audience_type_id: 1,
                    tags: tagIds,
                    shared_post_id: inputModalType.post_id,
                }),
            });
            setVisible(false);
        } else if (inputModalType.heading === "Edit Post") {
            await fetch(
                `http://localhost:3000/api/post?post-id=${inputModalType.post_id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: window.localStorage.getItem("auth"),
                    },
                    body: JSON.stringify({
                        content: textAreaValue,
                        audience_type_id: 1,
                        tags: tagIds,
                    }),
                }
            );
            setPosts((prev) =>
                prev.map((post) => {
                    if (post.id === inputModalType.post_id) {
                        return { ...post, content: textAreaValue };
                    }
                    return post;
                })
            );
            setVisible(false);
        }

        // inform user
    };

    const onPostDelete = async () => {
        await fetch(
            `http://localhost:3000/api/post?post-id=${inputModalType.post_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        setPosts((prev) =>
            prev.filter((post) => post.id !== inputModalType.post_id)
        );
        setVisible(false);
    };

    useEffect(() => {
        return () => {
            setTextAreaValue("");
            setInputModalType({ heading: "Create Post" });
        };
    }, []);

    return (
        <div
            className="ui dimmer modals page visible active"
            style={{ display: "flex !important", alignItems: "center" }}
        >
            <div
                className={`ui standard test modal scrolling transition visible active input-modal ${
                    inputModalType.heading === "Delete Post" ? "delete" : ""
                }`}
                style={{ display: "block !important" }}
            >
                <div className="icon-wrap">
                    <i
                        className="x icon close-input"
                        onClick={() => {
                            setVisible(!visible);
                        }}
                    />
                </div>

                <div className="ui large header">{inputModalType.heading}</div>

                {inputModalType.heading !== "Delete Post" ? (
                    <form className="ui form">
                        <div ref={fieldRef} className="field">
                            <div className="ui secondary pointing menu">
                                <a
                                    className={`${
                                        atPreview ? "" : "active"
                                    } item`}
                                    onClick={() => {
                                        setAtPreview(false);
                                    }}
                                >
                                    Edit
                                </a>
                                <a
                                    className={`${
                                        atPreview ? "active" : ""
                                    } item`}
                                    onClick={() => {
                                        setAtPreview(true);
                                    }}
                                >
                                    Preview
                                </a>
                            </div>
                            <div className="user-input-segment">
                                {renderFormContent()}
                                {inputModalType.heading === "Share Post" ? (
                                    <SharedPost
                                        id={inputModalType.post_id}
                                        user_id={inputModalType.user_id}
                                        username={inputModalType.username}
                                        profile_pic_url={
                                            inputModalType.profile_pic_url
                                        }
                                        created_at={inputModalType.created_at}
                                        content={inputModalType.content}
                                    />
                                ) : null}
                            </div>
                        </div>

                        <div className="post-prompt">
                            <button
                                className="ui primary button"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await onPostSubmit();
                                }}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="content">
                            <p>Are you sure you want to delete this post?</p>
                        </div>
                        <div className="actions">
                            <div
                                className="ui button"
                                onClick={() => {
                                    setVisible(false);
                                }}
                            >
                                No
                            </div>
                            <div
                                className="ui red button"
                                onClick={() => {
                                    onPostDelete();
                                }}
                            >
                                Yes
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InputModal;

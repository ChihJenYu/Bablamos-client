import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import MultipleSearchSelection from "./MultipleSearchSelection";
import "../css/input-modal.css";

const InputModal = ({ visible, setVisible, clientSocket, setClientSocket }) => {
    const [textAreaValue, setTextAreaValue] = useState("");
    const [atPreview, setAtPreview] = useState(false);

    const fieldRef = useRef();

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
                value={textAreaValue}
                onChange={onTextAreaChange}
                onKeyDown={onKeyDown}
            ></textarea>
        );
    };

    const onTextAreaChange = (e) => {
        setTextAreaValue(e.target.value);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("do validate");
        }
    };

    const onPostSubmit = async () => {
        const tags = Array.from(
            document.querySelectorAll(".multiple.selection.search a.ui.label")
        );
        const tagIds = tags.map((tag) => {
            return {
                tag_id: +tag.attributes.value.nodeValue,
                tag_name: tag.firstChild.data,
            };
        });

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
            }),
        });
        // inform user
    };

    return (
        <div
            className="ui dimmer modals page visible active"
            style={{ display: "flex !important", alignItems: "center" }}
        >
            <div
                className="ui standard test modal scrolling transition visible active input-modal"
                style={{ display: "block !important" }}
            >
                <i
                    className="large x icon close-input"
                    onClick={() => {
                        setVisible(!visible);
                    }}
                />
                <div className="ui large header">Create Post</div>

                <form className="ui form">
                    <div ref={fieldRef} className="field">
                        <div className="ui secondary pointing menu">
                            <a
                                className={`${atPreview ? "" : "active"} item`}
                                onClick={() => {
                                    setAtPreview(false);
                                }}
                            >
                                Edit
                            </a>
                            <a
                                className={`${atPreview ? "active" : ""} item`}
                                onClick={() => {
                                    setAtPreview(true);
                                }}
                            >
                                Preview
                            </a>
                        </div>
                        <div className="user-input-segment">
                            {/* <MultipleSearchSelection
                                dropdownOptions={dropdownOptions}
                                setDropdownOptions={setDropdownOptions}
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                                fetchDropdownOptions={fetchDropdownOptions}
                            /> */}
                            {renderFormContent()}
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
            </div>
        </div>
    );
};

export default InputModal;

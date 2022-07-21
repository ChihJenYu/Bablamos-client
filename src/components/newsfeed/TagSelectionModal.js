import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import MultipleSearchSelection from "../common/MultipleSearchSelection";
import "../../css/input-modal.css";

const TagSelectionModal = ({ visible, setVisible }) => {
    const [textAreaValue, setTextAreaValue] = useState("");
    const [atPreview, setAtPreview] = useState(false);
    // dropdownOptions: [{ id, name }]
    const [dropdownOptions, setDropdownOptions] = useState([]);
    // selectedOptions: [{id, name}]
    const [selectedOptions, setSelectedOptions] = useState([]);

    const fetchDropdownOptions = async (kw) => {
        const res = await fetch(`http://localhost:3000/api/tag?kw=${kw}`, {
            headers: { Authorization: window.localStorage.getItem("auth") },
        });
        const { matches } = await res.json();
        setDropdownOptions(matches);
    };

    const fieldRef = useRef();

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
                <div className="ui large header">Choose some tags</div>

                <form className="ui form">
                    <div ref={fieldRef} className="field">
                        <div className="user-input-segment">
                            <MultipleSearchSelection
                                dropdownOptions={dropdownOptions}
                                setDropdownOptions={setDropdownOptions}
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                                fetchDropdownOptions={fetchDropdownOptions}
                            />
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

export default TagSelectionModal;

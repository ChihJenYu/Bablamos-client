import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { editUserProfile } from "../../apis/user";
import "../../css/input-modal.css";
import "../../css/edit-modal.css";

function EditModal({
    editModalType,
    setVisible,
    textAreaValue,
    setTextAreaValue,
    profileUser,
    setProfileUser,
    setUser,
}) {
    const [atPreview, setAtPreview] = useState(false);
    const textAreaRef = useRef();
    const coverPicRef = useRef();
    const profilePicRef = useRef();
    const coverInputRef = useRef();
    const profileInputRef = useRef();
    const onPhotoInputChange = (inputRef, photoRef) => {
        const [file] = inputRef.current.files;
        if (file) {
            photoRef.current.src = URL.createObjectURL(file);
        }
    };
    const renderFormContent = () => {
        if (editModalType.heading === "Edit Profile Photo") {
            return (
                <div className="edit-modal">
                    <div className="edit-cover-img-segment">
                        <img
                            ref={coverPicRef}
                            src={profileUser.cover_pic_url}
                            alt=""
                            className="profile-cover"
                        />
                        <div className="cover-edit-icon">
                            <label htmlFor="cover-pic">
                                <i className="camera icon"></i>
                            </label>
                            <input
                                ref={coverInputRef}
                                onChange={(e) => {
                                    onPhotoInputChange(
                                        coverInputRef,
                                        coverPicRef
                                    );
                                }}
                                style={{ display: "none" }}
                                id="cover-pic"
                                type="file"
                            />
                        </div>
                    </div>
                    <div className="edit-profile-img-segment">
                        <img
                            ref={profilePicRef}
                            src={profileUser.profile_pic_url}
                            alt=""
                            className="profile-img"
                        />
                        <div className="profile-edit-icon">
                            <label htmlFor="profile-pic">
                                <i className="camera icon"></i>
                            </label>
                            <input
                                ref={profileInputRef}
                                onChange={(e) => {
                                    onPhotoInputChange(
                                        profileInputRef,
                                        profilePicRef
                                    );
                                }}
                                style={{ display: "none" }}
                                id="profile-pic"
                                type="file"
                            />
                        </div>
                    </div>
                </div>
            );
        }
        if (editModalType.heading === "Edit Info") {
            if (atPreview) {
                return (
                    <div className="markdown-viewport">
                        <ReactMarkdown>{textAreaValue}</ReactMarkdown>
                    </div>
                );
            }
            return (
                <textarea
                    placeholder="Introduce yourself!"
                    id="post-input-textarea"
                    ref={textAreaRef}
                    value={textAreaValue}
                    onChange={(e) => {
                        setTextAreaValue(e.target.value);
                    }}
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
        }
    };

    const onEditSubmit = async () => {
        if (editModalType.heading === "Edit Profile Photo") {
            let formData = new FormData();
            formData.append("profile-pic", profileInputRef.current.files[0]);
            formData.append("cover-pic", coverInputRef.current.files[0]);
            const res = await editUserProfile(
                "formdata",
                formData,
                window.localStorage.getItem("auth")
            );
            window.location.reload();
        }
        if (editModalType.heading === "Edit Info") {
            if (textAreaValue === "") {
                return;
            }
            await editUserProfile(
                "json",
                JSON.stringify({
                    info: textAreaValue,
                }),
                window.localStorage.getItem("auth")
            );
            setProfileUser((prev) => ({
                ...prev,
                user_info: textAreaValue,
            }));
            setVisible(false);
        }
    };

    return (
        <div
            className="ui dimmer modals page visible active"
            style={{ display: "flex !important", alignItems: "center" }}
        >
            <div
                className={`ui standard test modal scrolling transition visible active input-modal ${
                    editModalType.heading === "Edit Profile Photo" ? "big" : ""
                }`}
                style={{ display: "block !important" }}
            >
                <div className="icon-wrap">
                    <i
                        className="x icon close-input"
                        onClick={() => {
                            setVisible(false);
                        }}
                    />
                </div>

                <div className="ui large header">{editModalType.heading}</div>

                <form className="ui form">
                    <div className="field">
                        {editModalType.heading === "Edit Info" ? (
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
                        ) : null}
                        <div className={` user-input-segment`}>
                            {renderFormContent()}
                        </div>
                    </div>

                    <div className="post-prompt">
                        <button
                            className="ui primary button"
                            onClick={async (e) => {
                                e.preventDefault();
                                await onEditSubmit();
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;

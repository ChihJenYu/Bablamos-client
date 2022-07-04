import React from "react";
import ReactMarkdown from "react-markdown";
import "../../css/profile-user-info.css";

function TimelineUserInfo({
    showEditPrompt,
    userInfo,
    setEditModalType,
    editModalOpen,
    setEditModalOpen,
}) {
    return (
        <>
            <div className="user-info-menu">
                <h3>Info</h3>
                {showEditPrompt ? (
                    <div className="info-edit-icon">
                        <i
                            className="pencil alternate icon"
                            onClick={() => {
                                setEditModalType({ heading: "Edit Info" });
                                setEditModalOpen(!editModalOpen);
                            }}
                        ></i>
                    </div>
                ) : null}
                <ReactMarkdown>{userInfo}</ReactMarkdown>
            </div>
        </>
    );
}

export default TimelineUserInfo;

import React, { useState, useRef, useEffect } from "react";
import "../../css/meatball-menu.css";

function MeatballMenu({
    replier_user_id,
    user_id,
    post_id,
    username,
    setShowInputModal,
    textAreaValue,
    setTextAreaValue,
    content,
    setInputModalType,
}) {
    const [meatballOpen, setMeatballOpen] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                return;
            } else {
                setMeatballOpen(false);
            }
        };

        document.body.addEventListener("click", onBodyClick, { capture: true });

        return () => {
            document.body.removeEventListener("click", onBodyClick, {
                capture: true,
            });
        };
    }, []);

    const renderMenuContent = () => {
        if (replier_user_id === user_id) {
            return (
                <>
                    <div
                        className="item"
                        onClick={() => {
                            setShowInputModal(true);
                            setTextAreaValue(content);
                            setInputModalType({
                                heading: "Edit Post",
                                post_id,
                            });
                        }}
                    >
                        Edit post
                    </div>
                    <div
                        className="item"
                        onClick={() => {
                            setShowInputModal(true);
                            setInputModalType({
                                heading: "Delete Post",
                                post_id,
                            });
                        }}
                    >
                        Delete post
                    </div>
                </>
            );
        }
        return (
            <>
                <div className="item">Hide post</div>
                <div className="item">Hide all posts from {username}</div>
            </>
        );
    };

    return (
        <div className="ui text menu meatball">
            <div className="ui right dropdown item" ref={ref}>
                <div className="icon-wrap">
                    <i
                        className="ellipsis horizontal icon"
                        onClick={() => {
                            setMeatballOpen(!meatballOpen);
                        }}
                    ></i>
                </div>

                <div
                    className={`meatball-menu menu transition ${
                        meatballOpen ? "visible" : "hidden"
                    }`}
                >
                    {renderMenuContent()}
                </div>
            </div>
        </div>
    );
}

export default MeatballMenu;

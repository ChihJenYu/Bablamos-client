import React, { useState, useRef, useEffect } from "react";
import "../css/meatball-menu.css";

function MeatballMenu({ replier_user_id, user_id, username }) {
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
                    <div className="item">Edit post</div>
                    <div className="item">Delete post</div>
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

import React, { useState, useRef } from "react";
import "../../css/friend.css";
import { userAcceptFriend, userUnfriend } from "../../apis/user";
function Friend({ status, id, profile_pic_url, username, type }) {
    const [friended, setFriended] = useState(false);
    const ref = useRef();
    const onClickAcceptFriend = async (e) => {
        e.preventDefault();
        const res = await userAcceptFriend(
            id,
            window.localStorage.getItem("auth")
        );
        if (res.status == 201) {
            setFriended(true);
        }
    };

    const onClickUnfriend = async (e) => {
        e.preventDefault();

        const res = await userUnfriend(id, window.localStorage.getItem("auth"));
        if (res.status == 200) {
            ref.current.remove();
        }
    };

    return (
        <div className="item friend" ref={ref}>
            <a className="ui tiny image" href={`/profile/${username}`}>
                <img src={profile_pic_url} />
            </a>
            <div className="content">
                <a href={`/profile/${username}`} className="header">
                    {username}
                </a>
                {status === "received" ? (
                    <div className="friend-request-prompt">
                        {!friended ? (
                            <>
                                <div
                                    className="ui button bablamos-theme-prompt"
                                    onClick={onClickAcceptFriend}
                                >
                                    Confirm
                                </div>
                                <div
                                    className="ui button quiet single"
                                    onClick={onClickUnfriend}
                                >
                                    Decline
                                </div>
                            </>
                        ) : (
                            <div>
                                <i className="icon check" />
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Friend;

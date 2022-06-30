import React, { useState, useEffect } from "react";

function MentionInput({
    singleLine,
    placeholder,
    id,
    className,
    value,
    onValueChange,
}) {
    const [suggestFriendOpen, setSuggestFriendOpen] = useState(false);
    const [suggestFriendTerm, setSuggestFriendTerm] = useState("");
    const [suggestFriends, setSuggestFriends] = useState([]);

    const onChange = (e) => {
        onValueChange(e);
        // if (suggestFriendOpen) {
        //     setSuggestFriendTerm((prev) => prev + e.nativeEvent.data);
        // }
    };

    const onKeyDown = (e) => {
        console.log(e);
        if (e.key === "@") {
            setSuggestFriendOpen(true);
            return;
        }
        if (e.keyCode === 32) {
            setSuggestFriendOpen(false);
            setSuggestFriendTerm("");
            return;
        }
        if (suggestFriendOpen) {
            if (e.keyCode === 8) {
                setSuggestFriendTerm((prev) =>
                    prev.substring(0, prev.length - 1)
                );
                return;
            }
            setSuggestFriendTerm((prev) => prev + e.key);
        }
    };

    const searchFriends = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/friend?status=accepted&kw=${suggestFriendTerm.substring(
                1
            )}`,
            {
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        const json = await res.json();
        if (json.data.length > 0) {
            setSuggestFriends(json.data);
        }
    };

    useEffect(() => {
        // if (suggestFriendTerm !== "" || suggestFriendTerm !== "@") {
        //     searchFriends();
        // }
        console.log(suggestFriendTerm);
    }, [suggestFriendTerm]);

    const renderSuggestFriends = () => {
        return suggestFriends.map((friend) => {
            return <div>{friend.friend_name}</div>;
        });
    };

    if (singleLine) {
        return <div></div>;
    }
    return (
        <div>
            <textarea
                placeholder={placeholder}
                id={id}
                className={className}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            ></textarea>
            {suggestFriendOpen ? (
                <div className="suggest-friend-menu">
                    {renderSuggestFriends()}
                </div>
            ) : null}
        </div>
    );
}

export default MentionInput;

import React from "react";
import { Mention, MentionsInput } from "react-mentions";
import Style from "../css/single-line.module.css";
import "../css/single-line.css";

function SingleLine({ value, onChange }) {
    const searchFriends = (query, cb) => {
        fetch(
            `http://localhost:3000/api/user/friend?status=accepted&kw=${query}&type=mention`,
            {
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        )
            .then((res) => res.json())
            .then((res) =>
                res.data.map((friend) => ({
                    display: friend.friend_name,
                    id: friend.id,
                }))
            )
            .then(cb);
    };
    return (
        <div>
            <MentionsInput
                className="mentions"
                classNames={Style}
                singleLine
                value={value}
                onChange={onChange}
            >
                <Mention
                    data={searchFriends}
                    className={Style.mentions__mention}
                    style={{ backgroundColor: "rgb(198, 218, 245)" }}
                    markup={"@[__display__](__id__)"}
                />
            </MentionsInput>
        </div>
    );
}

export default SingleLine;

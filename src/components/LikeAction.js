import React from "react";
import { Icon } from "semantic-ui-react";
function LikeAction({ hasLiked, setHasLiked, edge, likeCount, setLikeCount }) {
    const onLikeIconClick = () => {
        if (hasLiked) {
            fetch("http://localhost:3000/api/user/like", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("auth"),
                },
                body: JSON.stringify(edge),
            });
            setLikeCount(likeCount - 1);
        } else if (!hasLiked) {
            fetch("http://localhost:3000/api/user/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("auth"),
                },
                body: JSON.stringify(edge),
            });
            setLikeCount(likeCount + 1);
        }
        setHasLiked(!hasLiked);
    };

    return (
        <React.Fragment>
            <Icon
                className={hasLiked ? "heart red" : "heart outline"}
                onClick={onLikeIconClick}
            />
            {likeCount}
        </React.Fragment>
    );
}

export default LikeAction;

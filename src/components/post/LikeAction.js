import React from "react";
import { Icon } from "semantic-ui-react";
import { userLike, userUnlike } from "../../apis/user";
function LikeAction({
    hasLiked,
    setHasLiked,
    edge,
    likeCount,
    setLikeCount,
    type,
}) {
    const onLikeIconClick = () => {
        if (hasLiked) {
            userUnlike(edge, window.localStorage.getItem("auth"));
            setLikeCount(likeCount - 1);
        } else if (!hasLiked) {
            userLike(edge, window.localStorage.getItem("auth"));
            setLikeCount(likeCount + 1);
        }
        setHasLiked(!hasLiked);
    };

    return (
        <>
            <Icon
                className={hasLiked ? "heart red" : "heart outline"}
                onClick={onLikeIconClick}
            />
            {type !== "comment"
                ? likeCount
                : likeCount === 0
                ? null
                : likeCount}
        </>
    );
}

export default LikeAction;

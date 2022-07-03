import React, { useRef } from "react";

function CommentAction({ commentCount }) {
    const commentRef = useRef();

    const onCommentIconClick = () => {
        commentRef.current.parentElement.parentElement.nextElementSibling
            .querySelector(
                ".input-inline .content .single-line_mentions__control__hegso input"
            )
            .focus();
    };

    return (
        <React.Fragment>
            <i
                ref={commentRef}
                className="comment alternate icon"
                onClick={onCommentIconClick}
            />
            {commentCount}
        </React.Fragment>
    );
}

export default CommentAction;

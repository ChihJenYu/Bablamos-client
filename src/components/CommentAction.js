import React, { useRef } from "react";
// import { Icon } from "semantic-ui-react";

function CommentAction({ commentCount }) {
    const commentRef = useRef();

    const onCommentIconClick = () => {
        commentRef.current.parentElement.parentElement.nextElementSibling
            .querySelector(".input-inline .ui.input input")
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

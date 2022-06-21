import React, { useState } from "react";
import moment from "moment";
import { Comment, Icon } from "semantic-ui-react";
import LikeAction from "./LikeAction";
import "../css/comment.css";

function CommentComponent({
    id,
    user_id,
    username,
    profile_pic_url,
    content,
    created_at,
    liked,
}) {
    const EDGE_TYPE = "comment";

    const [hasLiked, setHasLiked] = useState(liked || false);

    return (
        <Comment>
            <Comment.Avatar as="a" src={profile_pic_url} />
            <Comment.Content>
                <Comment.Author as="a">{username}</Comment.Author>
                <Comment.Metadata>
                    <div className="date">
                        {moment.unix(+created_at).fromNow()}
                    </div>
                </Comment.Metadata>
                <Comment.Text>{content}</Comment.Text>
                <Comment.Actions>
                    <LikeAction
                        hasLiked={hasLiked}
                        setHasLiked={setHasLiked}
                        edge={{ edge_id: id, edge_type: EDGE_TYPE }}
                    />
                    <Icon className="comment outline" />
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    );
}

export default CommentComponent;

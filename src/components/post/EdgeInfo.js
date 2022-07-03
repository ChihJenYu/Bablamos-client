import React from "react";
import moment from "moment";
import { Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";

function EdgeInfo({
    user_id,
    username,
    profile_pic_url,
    shared_post_id,
    created_at,
}) {
    const renderSummary = (shared_post_id) => {
        if (!shared_post_id) {
            return "";
        }
        return " shared a post";
    };

    return (
        <Feed>
            <Feed.Event>
                <Feed.Label>
                    <Link to={`/profile/${username}`}>
                        <img src={profile_pic_url} />
                    </Link>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={`/profile/${username}`}>
                            <Feed.User>{username}</Feed.User>
                        </Link>
                        {renderSummary(shared_post_id)}
                        <Feed.Date>
                            {moment.unix(+created_at).fromNow()}
                        </Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    );
}

export default EdgeInfo;
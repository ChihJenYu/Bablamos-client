import React from "react";
import moment from "moment";
import { Feed } from "semantic-ui-react";

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
                <Feed.Label
                    onClick={() => {
                        window.location.href = `/profile/${username}`;
                    }}
                >
                    <img style={{ cursor: "pointer" }} src={profile_pic_url} />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary
                        onClick={() => {
                            window.location.href = `/profile/${username}`;
                        }}
                    >
                        <Feed.User>{username}</Feed.User>
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

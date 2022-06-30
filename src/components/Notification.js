import React, { useState } from "react";
import moment from "moment";

function Notification({
    notification,
    setUnreadNotificationCount,
    setNotifications,
}) {
    const renderNotificationSummary = (type) => {
        if (type === 1) {
            return " has a new post.";
        }
        if (type === 2) {
            return " commented on your post.";
        }
        if (type === 4) {
            return " is now your follower.";
        }
        if (type === 5) {
            return " sent you a friend request.";
        }
        if (type === 6) {
            return " is now your friend.";
        }
    };

    const onClickNotification = () => {
        if (notification.read_by_user === 0) {
            fetch(
                `http://localhost:3000/api/notification/read?id=${notification.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: window.localStorage.getItem("auth"),
                    },
                }
            );
            setUnreadNotificationCount((prev) =>
                [prev[0] - 1] >= 0 ? [prev[0] - 1] : [0]
            );
            setNotifications((prev) =>
                prev.map((not) => {
                    if (not.id === notification.id) {
                        not.read_by_user = 1;
                    }
                    return not;
                })
            );
        }
    };

    return (
        <div className="event notification-body" onClick={onClickNotification}>
            <div className="label">
                <img alt="profile" src={notification.profile_pic_url} />
            </div>
            <div className="content">
                <div
                    className={`${
                        notification.read_by_user ? "" : "unread"
                    } summary`}
                >
                    <div>
                        <div className="notification-summary">
                            <a
                                href={`/profile/${notification.username}`}
                                className="user"
                            >
                                {notification.username}
                            </a>
                            <span>
                                {renderNotificationSummary(
                                    notification.notification_type_id
                                )}
                            </span>
                        </div>
                        <div className="date">
                            {moment.unix(+notification.created_at).fromNow()}
                        </div>
                    </div>
                    {!notification.read_by_user ? (
                        <div className="unread-sphere"></div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Notification;

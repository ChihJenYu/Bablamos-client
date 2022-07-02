import React from "react";
import moment from "moment";
import history from "../history";

function Notification({
    notification,
    setUnreadNotificationCount,
    setNotifications,
}) {
    const renderNotificationSummary = () => {
        if (notification.notification_type_id === 1) {
            return " has a new post.";
        }
        if (notification.notification_type_id === 2) {
            return " commented on your post.";
        }
        if (notification.notification_type_id === 3) {
            return " mentioned you in a comment.";
        }
        if (notification.notification_type_id === 4) {
            return " is now your follower.";
        }
        if (notification.notification_type_id === 5) {
            return " sent you a friend request.";
        }
        if (notification.notification_type_id === 6) {
            return " is now your friend.";
        }
    };

    const notificationReditect = () => {
        if (notification.notification_type_id === 1) {
            return () => {
                history.push(`/post/${notification.inv_post_id}`);
            };
        }
        if (notification.notification_type_id === 2) {
            return () => {
                history.push(`/post/${notification.inv_post_id}`);
            };
        }
        if (notification.notification_type_id === 3) {
            return () => {
                history.push(`/post/${notification.inv_post_id}`);
            };
        }
        if (notification.notification_type_id === 4) {
            return () => {
                history.push(`/profile/${notification.username}`);
            };
        }
        if (notification.notification_type_id === 5) {
            return () => {
                history.push(`/profile/${notification.username}`);
            };
        }
        if (notification.notification_type_id === 6) {
            return () => {
                history.push(`/profile/${notification.username}`);
            };
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
        notificationReditect()();
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
                            <span>{renderNotificationSummary()}</span>
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

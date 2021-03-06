import React from "react";
import moment from "moment";
import history from "../../history";
import { readNotification } from "../../apis/notification";

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
        if (notification.notification_type_id === 7) {
            return " shared your post.";
        }
    };

    const notificationRedirect = () => {
        if (
            notification.notification_type_id === 1 ||
            notification.notification_type_id === 2 ||
            notification.notification_type_id === 3 ||
            notification.notification_type_id === 7
        ) {
            return () => {
                history.push(`/post/${notification.inv_post_id}`);
            };
        }
        if (
            notification.notification_type_id === 4 ||
            notification.notification_type_id === 5 ||
            notification.notification_type_id === 6
        ) {
            return () => {
                window.location.href = `/profile/${notification.username}`;
            };
        }
    };

    const onClickNotification = () => {
        if (notification.read_by_user === 0) {
            readNotification(
                notification.id,
                window.localStorage.getItem("auth")
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
        notificationRedirect()();
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
                </div>
            </div>
        </div>
    );
}

export default Notification;

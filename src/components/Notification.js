import React from "react";
import moment from "moment";

function Notification({ notification }) {
    const renderNotificationSummary = (type) => {
        if (type == 1) {
            return " just created a post.";
        }
    };

    return (
        <div className="event notification-body">
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

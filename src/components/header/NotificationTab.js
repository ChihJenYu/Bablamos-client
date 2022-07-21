import React from "react";
import Notification from "./Notification";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../common/Loader";
import "../../css/notification-tab.css";

function NotificationTab({
    notifications,
    setNotifications,
    setUnreadNotificationCount,
    fetchNotifications,
    hasReachedEnd,
}) {
    const renderNotifications = () => {
        if (notifications.length === 0) {
            return <p style={{ lineHeight: "422px" }}>All clear!</p>;
        }
        return notifications.map((not) => {
            return (
                <Notification
                    key={not.id}
                    notification={not}
                    setUnreadNotificationCount={setUnreadNotificationCount}
                    setNotifications={setNotifications}
                />
            );
        });
    };

    return (
        <div className="notification-tab">
            <h3>Notifications</h3>
            <div
                className="header-tab-content ui feed"
                id="notification-scroll"
            >
                <InfiniteScroll
                    dataLength={notifications.length}
                    next={fetchNotifications}
                    hasMore={!hasReachedEnd}
                    loader={<Loader text="Loading" />}
                    endMessage={
                        notifications.length !== 0 ? (
                            <p className="end-message">That's all!</p>
                        ) : null
                    }
                    scrollableTarget="notification-scroll"
                >
                    {renderNotifications()}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default NotificationTab;

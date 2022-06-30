import React, { useState, useEffect, useRef } from "react";
import NotificationTab from "./NotificationTab";

function NotificationIndicator({
    fetchNotifications,
    hasReachedEnd,
    unreadNotificationCount,
    notifications,
    setUnreadNotificationCount,
    setNotifications,
}) {
    const tabRef = useRef();

    const [notificationTabOpen, setNotificationTabOpen] = useState(false);

    useEffect(() => {
        const onBodyClick = (e) => {
            if (tabRef.current.contains(e.target)) {
                return;
            } else {
                setNotificationTabOpen(false);
            }
        };

        document.body.addEventListener("click", onBodyClick, { capture: true });

        return () => {
            document.body.removeEventListener("click", onBodyClick, {
                capture: true,
            });
        };
    }, []);

    return (
        <div className="item">
            <div
                ref={tabRef}
                className="notification-indicator"
                style={{ cursor: "pointer" }}
            >
                <i
                    className="bell icon large"
                    onClick={() => {
                        setNotificationTabOpen(!notificationTabOpen);
                    }}
                />
                <div
                    className={`notification-count ${
                        unreadNotificationCount[0] === 0 ? "hidden" : ""
                    }`}
                >
                    {unreadNotificationCount[0]}
                </div>
                {notificationTabOpen ? (
                    <NotificationTab
                        notifications={notifications}
                        setNotifications={setNotifications}
                        setUnreadNotificationCount={setUnreadNotificationCount}
                        fetchNotifications={fetchNotifications}
                        hasReachedEnd={hasReachedEnd}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default NotificationIndicator;

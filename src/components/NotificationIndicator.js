import React, { useState, useEffect, useRef } from "react";
import NotificationTab from "./NotificationTab";

function NotificationIndicator({ unreadNotificationCount, notifications }) {
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
                        notificationTabOpen={notificationTabOpen}
                        setNotificationTabOpen={setNotificationTabOpen}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default NotificationIndicator;

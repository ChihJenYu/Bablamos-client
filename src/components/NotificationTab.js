import React from "react";
import Notification from "./Notification";
import "../css/notification-tab.css";

function NotificationTab({ notifications }) {
    const renderNotifications = () => {
        if (notifications.length === 0) {
            return <p style={{ lineHeight: "422px" }}>All clear!</p>;
        }
        return notifications.map((not) => {
            return <Notification notification={not} />;
        });
    };

    return (
        <div className="notification-tab">
            <h3>Notifications</h3>
            <div className="header-tab-content ui feed">
                {renderNotifications()}
            </div>
        </div>
    );
}

export default NotificationTab;

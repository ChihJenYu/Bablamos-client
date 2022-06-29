import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import NotificationTab from "./NotificationTab";
import NotificationIndicator from "./NotificationIndicator";

const Header = ({
    username,
    profile_pic_url,
    clientSocket,
    setClientSocket,
}) => {
    const [unreadNotificationCount, setUnreadNotificationCount] = useState([0]);
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const res = await fetch("http://localhost:3000/api/notification", {
            headers: {
                Authorization: window.localStorage.getItem("auth"),
            },
        });
        const json = await res.json();
        setNotifications((prev) => [...prev, ...json.data]);
    };

    const fetchUnreadNotificationCount = async () => {
        const res = await fetch(
            "http://localhost:3000/api/notification/count",
            {
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        const json = await res.json();
        setUnreadNotificationCount((prev) => [json.unread_count]);
    };

    useEffect(() => {
        fetchUnreadNotificationCount();
        fetchNotifications();
        clientSocket.socket.on(
            "display_type_1_notification",
            ({
                username,
                inv_user_id,
                inv_post_id,
                id,
                created_at,
                profile_pic_url,
            }) => {
                setUnreadNotificationCount((prev) => [prev[[0]] + 1]);
                setNotifications((prev) => [
                    {
                        notification_type_id: 1,
                        inv_user_id,
                        username,
                        inv_post_id,
                        id,
                        created_at,
                        read_by_user: 0,
                        profile_pic_url,
                    },
                    ...prev,
                ]);
            }
        );
    }, []);

    return (
        <div className="ui secondary menu header">
            <div className="left menu">
                <Link to="/">
                    <div className="logo item">Bablamos</div>
                </Link>
                <div className="search item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Search Bablamos" />
                        <i className="search link icon"></i>
                    </div>
                </div>
            </div>
            <div className="item center">
                <Link to="/">
                    <i className="home icon large" />
                </Link>
            </div>

            <div className="right menu">
                <div className="item">
                    <div className="message-indicator">
                        <i className="comments icon large" />
                        <div className="message-count"></div>
                    </div>
                </div>
                <NotificationIndicator
                    unreadNotificationCount={unreadNotificationCount}
                    setUnreadNotificationCount={setUnreadNotificationCount}
                    notifications={notifications}
                    setNotifications={setNotifications}
                />
                <div className="item">
                    <a className="profile-link" href={`/profile/${username}`}>
                        <img alt="profile" src={profile_pic_url} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import SearchDropdownRound from "./SearchDropdownRound";
import NotificationIndicator from "./NotificationIndicator";

const Header = ({
    username,
    profile_pic_url,
    clientSocket,
    setClientSocket,
    profileUser,
    setProfileUser,
}) => {
    const [unreadNotificationCount, setUnreadNotificationCount] = useState([0]);
    const [notifications, setNotifications] = useState([]);
    const [notificationPaging, setNotificationPaging] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);

    const fetchNotifications = async () => {
        const res = await fetch(
            `http://localhost:3000/api/notification?paging=${notificationPaging}`,
            {
                headers: {
                    Authorization: window.localStorage.getItem("auth"),
                },
            }
        );
        const json = await res.json();
        if (json.data.length === 0) {
            setHasReachedEnd(true);
            return;
        }
        setNotificationPaging(notificationPaging + 1);
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

    const fetchUsers = async (kw) => {
        const res = await fetch(`http://localhost:3000/api/user?kw=${kw}`, {
            headers: {
                Authorization: window.localStorage.getItem("auth"),
            },
        });
        const json = await res.json();
        return json.data;
    };

    useEffect(() => {
        fetchUnreadNotificationCount();
        fetchNotifications();
        clientSocket.socket.on(
            "display_notification",
            ({
                notification_type_id,
                username,
                inv_user_id,
                inv_post_id,
                inv_comment_id,
                id,
                created_at,
                profile_pic_url,
            }) => {
                setUnreadNotificationCount((prev) => [prev[[0]] + 1]);
                setNotifications((prev) => [
                    {
                        notification_type_id,
                        inv_user_id,
                        username,
                        inv_post_id,
                        inv_comment_id,
                        id,
                        created_at,
                        read_by_user: 0,
                        profile_pic_url,
                    },
                    ...prev,
                ]);
                if (!profileUser || profileUser.user_id !== inv_user_id) {
                    return;
                }
                if (notification_type_id === 5) {
                    setProfileUser((prev) => ({
                        ...prev,
                        friend_status: "received",
                    }));
                    return;
                }
                if (notification_type_id === 6) {
                    setProfileUser((prev) => ({
                        ...prev,
                        friend_status: "accepted",
                    }));
                    return;
                }
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
                    <SearchDropdownRound fetch={fetchUsers} />
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
                    fetchNotifications={fetchNotifications}
                    hasReachedEnd={hasReachedEnd}
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

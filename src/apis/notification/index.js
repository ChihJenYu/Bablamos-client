export const getNotifications = async (paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/notification?paging=${paging}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const json = await res.json();
    return json;
};

export const getUnreadNotificationCount = async (token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/notification/count`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const json = await res.json();
    return json;
};

export const readNotification = async (notification_id, token) => {
    await fetch(
        `${process.env.REACT_APP_HOST}/notification/read?id=${notification_id}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
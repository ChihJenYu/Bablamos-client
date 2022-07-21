export const getNotifications = async (paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/notification?paging=${paging}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
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
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
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

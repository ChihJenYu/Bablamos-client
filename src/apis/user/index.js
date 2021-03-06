export const userSignin = async (body) => {
    const res = await fetch(`${process.env.REACT_APP_HOST}/user/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return res;
};

export const userSignup = async (body) => {
    const res = await fetch(`${process.env.REACT_APP_HOST}/user/signup`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
};

export const userSignOut = async () => {
    const res = await fetch(`${process.env.REACT_APP_HOST}/user/signout`, {
        method: "POST",
    });
    return res;
};

export const editUserProfile = async (content_type, body, token) => {
    const headers = new Headers();
    if (content_type === "json") {
        headers.append("Content-Type", "application/json");
    }
    headers.append("Authorization", `Bearer ${token}`);
    const res = await fetch(`${process.env.REACT_APP_HOST}/user/info`, {
        method: "PATCH",
        headers,
        body,
    });
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
    return res;
};

export const getUserInfo = async (token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/info?at=index`,
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

export const getProfileUserInfo = async (username, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/info?at=profile&username=${username}`,
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

export const searchUsers = async (type, kw, paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/search?type=${type}&kw=${kw}&paging=${paging}`,
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

export const searchFriendSuggestions = (kw, token) => {
    return fetch(
        `${process.env.REACT_APP_HOST}/user/friend?status=accepted&kw=${kw}&type=mention`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getPublicFriends = async (user_in_question, paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/friend?id=${user_in_question}&status=accepted&paging=${paging}`,
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

export const getFriendRequests = async (user_in_question, paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/friend?id=${user_in_question}&status=received&paging=${paging}`,
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

export const userSeeFreshPosts = async (posts, token) => {
    fetch(`${process.env.REACT_APP_HOST}/user/read?type=new`, {
        method: "POST",
        keepalive: true,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            posts,
        }),
    });
};

export const userSeePosts = async (posts, token) => {
    await fetch(`${process.env.REACT_APP_HOST}/user/read?type=read`, {
        method: "POST",
        keepalive: true,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            posts,
        }),
    });
};

export const userLike = async (edge, token) => {
    fetch(`${process.env.REACT_APP_HOST}/user/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(edge),
    });
};

export const userUnlike = async (edge, token) => {
    await fetch(`${process.env.REACT_APP_HOST}/user/like`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(edge),
    });
};

export const userFollow = async (user_id, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/follow?id=${user_id}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
    return res;
};

export const userUnfollow = async (user_id, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/follow?id=${user_id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
    return res;
};

export const userAcceptFriend = async (user_id, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/friend?user-id=${user_id}&action=accept`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
    return res;
};

export const userSendFriend = async (user_id, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/friend?user-id=${user_id}&action=send`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
    return res;
};

export const userUnfriend = async (user_id, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/friend?user-id=${user_id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status == 401 || res.status == 403) {
        window.location.href = "/welcome";
        return;
    }
    return res;
};

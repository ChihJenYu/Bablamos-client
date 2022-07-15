export const getIndexPosts = async (paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/newsfeed?at=index&paging=${paging}`,
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

export const getProfilePosts = async (user_in_question, paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/user/newsfeed?at=profile&id=${user_in_question}&paging=${paging}`,
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

export const searchPosts = async (kw, paging, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/post/search?kw=${kw}&paging=${paging}`,
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

export const getPostDetail = async (post_id, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/post?post-id=${post_id}`,
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

export const createPost = async (body, token) => {
    await fetch(`${process.env.REACT_APP_HOST}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const editPost = async (post_id, body, token) => {
    await fetch(`${process.env.REACT_APP_HOST}/post?post-id=${post_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const deletePost = async (post_id, token) => {
    await fetch(`${process.env.REACT_APP_HOST}/post?post-id=${post_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createComment = async (body, post_id, token) => {
    const res = await fetch(
        `${process.env.REACT_APP_HOST}/comment?post-id=${post_id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }
    );
    const json = await res.json();
    return json;
};

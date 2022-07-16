import React, { useState, useEffect } from "react";
import VerticalMenu from "../common/VerticalMenu";
import Header from "../header/Header";

function HomepageFrame({ notFound, user, clientSocket, setClientSocket }) {
    useEffect(() => {}, []);

    return (
        <>
            <Header
                user_id={user.user_id}
                username={user.username}
                profile_pic_url={user.profile_pic_url}
                clientSocket={clientSocket}
                setClientSocket={setClientSocket}
            />
            {notFound ? null : <VerticalMenu username={user.username} />}
        </>
    );
}

export default HomepageFrame;

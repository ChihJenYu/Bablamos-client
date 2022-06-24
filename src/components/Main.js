import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Route, Link, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import UserProfile from "./UserProfile";

function Main() {
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });

    const fetchUserInfo = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/info?at=index`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            }
        );
        const json = await res.json();
        setUser(json.data);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div>
            <Header
                username={user.username}
                profile_pic_url={user.profile_pic_url}
            />
            <Switch>
                <Route
                    path="/home"
                    render={({ user }) => <Homepage user={user} />}
                ></Route>
                {/* <Homepage user={user} /> */}
                <Route path="/profile" component={UserProfile}></Route>
                {/* <UserProfile /> */}
            </Switch>
        </div>
    );
}

export default Main;

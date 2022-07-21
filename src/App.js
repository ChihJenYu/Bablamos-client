import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/index/Homepage";
import User from "./components/user/User";
import UserProfile from "./components/profile/UserProfile";
import PostDetail from "./components/index/PostDetail";
import Search from "./components/index/Search";
import history from "./history.js";
import { io } from "socket.io-client";

const App = () => {
    const [clientSocket, setClientSocket] = useState({
        socket: null,
        user_id: null,
    });
    useEffect(() => {
        const clientSocket = io(process.env.REACT_APP_WS_HOST);
        setClientSocket({
            socket: clientSocket,
            user_id: null,
        });
    }, []);

    useEffect(() => {
        if (clientSocket.user_id && clientSocket.socket) {
            clientSocket.socket.emit("login", {
                user_id: clientSocket.user_id,
            });
        }
    }, [clientSocket]);

    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route path="/welcome" component={User}></Route>
                    <Route
                        path="/profile/:username"
                        exact
                        render={() => (
                            <UserProfile
                                clientSocket={clientSocket}
                                setClientSocket={setClientSocket}
                            />
                        )}
                    ></Route>
                    <Route
                        path="/post/:postId"
                        exact
                        render={() => (
                            <PostDetail
                                clientSocket={clientSocket}
                                setClientSocket={setClientSocket}
                            />
                        )}
                    ></Route>
                    <Route
                        path="/search"
                        exact
                        render={() => (
                            <Search
                                clientSocket={clientSocket}
                                setClientSocket={setClientSocket}
                            />
                        )}
                    ></Route>
                    <Route
                        path="/"
                        render={() => (
                            <Homepage
                                clientSocket={clientSocket}
                                setClientSocket={setClientSocket}
                            />
                        )}
                    ></Route>
                </Switch>
            </Router>
        </>
    );
};

export default App;

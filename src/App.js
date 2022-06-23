import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import User from "./components/User";
import UserProfile from "./components/UserProfile";
import Main from "./components/Main";
import history from "./history.js";

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/welcome" component={User}></Route>
                    <Route path="/profile" component={UserProfile}></Route>
                    <Route path="/" component={Homepage}></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;

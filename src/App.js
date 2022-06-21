import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Newsfeed from "./components/Newsfeed";
import User from "./components/User";
import history from "./history.js";

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Newsfeed}></Route>
                    <Route path="/welcome" component={User}></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;

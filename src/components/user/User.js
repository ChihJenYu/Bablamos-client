import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "../../css/user.css";

const User = () => {
    const [atSignUp, setAtSignUp] = useState(false);

    return (
        <div
            className="welcome-page"
            style={{
                backgroundImage:
                    "url(https://d3h0a68hsbn5ed.cloudfront.net/welcome-page/0.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="user-modal">
                {atSignUp ? null : <Signin onCreateClick={setAtSignUp} />}
                {atSignUp ? <Signup onSignInClick={setAtSignUp} /> : null}
            </div>
        </div>
    );
};

export default User;

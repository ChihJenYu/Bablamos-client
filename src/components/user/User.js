import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "../../css/user.css";

const User = () => {
    const [atSignUp, setAtSignUp] = useState(false);

    return (
        <div className="user-modal">
            {atSignUp ? null : <Signin onCreateClick={setAtSignUp} />}
            {atSignUp ? <Signup onSignInClick={setAtSignUp} /> : null}
        </div>
    );
};

export default User;

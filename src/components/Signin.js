import React, { useEffect, useState } from "react";
import history from "../history";

const Signin = ({ onCreateClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSigninClick = async () => {
        const res = await fetch("http://localhost:3000/api/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const json = await res.json();
        window.localStorage.setItem("auth", json.access_token);
        history.push("/");
    };

    return (
        <div className="signin">
            {/* <div className="logo">Bablamos</div> */}
            <div className="ui large header">Sign in</div>
            <form className="ui form">
                <div className="field">
                    <label>Email address</label>
                    <input
                        id="signin-email"
                        type="text"
                        value={email}
                        placeholder="me@example.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="signin-prompt">
                    <button
                        className="ui button"
                        onClick={() => {
                            onCreateClick(true);
                        }}
                    >
                        Create account
                    </button>
                    <button
                        className="ui primary button"
                        onClick={(e) => {
                            e.preventDefault();
                            onSigninClick();
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signin;

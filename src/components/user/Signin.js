import React, { useEffect, useState } from "react";
import history from "../../history";
import { userSignin } from "../../apis/user";

const Signin = ({ onCreateClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSigninClick = async () => {
        if (email === "" || password === "") {
            alert("Oops! You missed some required fields.");
            return;
        }
        const res = await userSignin({ email, password });
        if (res.status != 200) {
            alert("Oops! Wrong email or password.");
            return;
        }
        const json = await res.json();
        window.localStorage.setItem("auth", json.access_token);
        history.push("/");
    };

    return (
        <div className="signin">
            <div className="logo welcome">Bablamos</div>
            <div className="ui large header">Welcome back!</div>
            <form className="ui form">
                <div className="field">
                    <label>Email address</label>
                    <input
                        id="signin-email"
                        type="email"
                        value={email}
                        placeholder="me@example.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
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
                        required
                    />
                </div>
                <div className="signin-prompt">
                    <button
                        className="ui primary button"
                        onClick={(e) => {
                            e.preventDefault();
                            onSigninClick();
                        }}
                    >
                        Sign in
                    </button>
                    <button
                        className="ui button"
                        onClick={() => {
                            onCreateClick(true);
                        }}
                    >
                        Don't have an account?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signin;

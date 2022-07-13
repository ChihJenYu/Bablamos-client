import React, { useState } from "react";
import history from "../../history";
import { userSignup } from "../../apis/user";
const Signup = ({ onSignInClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const onSignupClick = async (e) => {
        if (email === "" || password === "" || username === "") {
            alert("Oops! You missed some required fields.");
            return;
        }
        e.preventDefault();
        const res = await userSignup({
            username,
            email,
            password,
        });
        if (res.status != 200) {
            alert("Oops! Some fields are invalid.");
            return;
        }
        const json = await res.json();
        window.localStorage.setItem("auth", json.access_token);
        history.push("/");
    };

    return (
        <div className="signup">
            <div className="logo welcome">Bablamos</div>
            <div className="ui large header">Hey there!</div>
            <form className="ui form">
                <div className="field">
                    <label>User name</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="field">
                    <label>Email address</label>
                    <input
                        id="register-email"
                        type="email"
                        placeholder="me@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="field">
                    <label>Confirm password</label>
                    <input
                        id="register-reenter-password"
                        type="password"
                        required
                    />
                </div>
                <div className="signin-prompt">
                    <button
                        type="submit"
                        className="register-submit ui primary button"
                        onClick={onSignupClick}
                    >
                        Sign up
                    </button>
                    <button
                        className="ui button"
                        onClick={() => {
                            onSignInClick(false);
                        }}
                    >
                        Already have an account?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;

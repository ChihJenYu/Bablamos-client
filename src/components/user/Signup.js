import React, { useState } from "react";
import history from "../../history";
import { userSignup } from "../../apis/user";
const Signup = ({ onSignInClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const onSignupClick = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        // formData.append(
        //     "profile-pic",
        //     document.querySelector("#profile-pic").files[0]
        // );

        const json = await userSignup(formData);
        window.localStorage.setItem("auth", json.access_token);
        history.push("/");
    };

    return (
        <div className="signup">
            {/* <div className="logo">Bablamos</div> */}
            <div className="ui large header">Create account</div>
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
                    />
                </div>
                <div className="field">
                    <label>Email address</label>
                    <input
                        id="register-email"
                        type="text"
                        placeholder="me@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
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
                    />
                </div>
                <div className="field">
                    <label>Confirm password</label>
                    <input id="register-reenter-password" type="password" />
                </div>
                {/* <div className="field">
                    <label>Upload profile image</label>
                    <input id="profile-pic" type="file" name="profile-pic" />
                </div> */}
                <div className="signin-prompt">
                    <button
                        className="ui button"
                        onClick={() => {
                            onSignInClick(false);
                        }}
                    >
                        Already have an account?
                    </button>
                    <button
                        className="register-submit ui primary button"
                        onClick={onSignupClick}
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;

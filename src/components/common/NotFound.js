import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/not-found.css";

function NotFound(props) {
    return (
        <div className="not-found-section">
            <div className="not-found-icon">
                <img src="https://d3h0a68hsbn5ed.cloudfront.net/icon/error-404.png" />
            </div>
            <div className="not-found-message">
                <h3>Whatever you're looking for, it ain't here.</h3>
                <label>
                    Check if your link is correct, or{" "}
                    <NavLink to="/">Return to home</NavLink>
                </label>
            </div>
        </div>
    );
}

export default NotFound;

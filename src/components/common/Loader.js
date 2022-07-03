import React from "react";
import "../../css/loader.css";

function Loader({ text }) {
    return (
        <div className="custom-loader">
            <div className="ui active centered inline loader"></div>
            <label>{text}</label>
        </div>
    );
}

export default Loader;

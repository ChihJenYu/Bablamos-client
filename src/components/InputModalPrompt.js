import React from "react";
import "../css/input-modal-prompt.css";
const InputModalPrompt = ({ setVisible }) => {
    return (
        <div
            className="post-input-prompt"
            onClick={() => {
                setVisible(true);
            }}
        >
            <h3>What's on your mind?</h3>
        </div>
    );
};

export default InputModalPrompt;

import React, { useState, useEffect } from "react";
import parseMention from "../utils/parse-mention";

function MentionRender({ comment }) {
    const [text, setText] = useState("");

    useEffect(() => {
        if (comment !== "") {
            const { output } = parseMention(comment);
            setText(output);
        }
    }, [comment]);

    return (
        <p
            className="d-inline comment-paragraph-text"
            dangerouslySetInnerHTML={{
                __html: text.replace(/\n\r?/g, "<br />"),
            }}
        />
    );
}

export default MentionRender;

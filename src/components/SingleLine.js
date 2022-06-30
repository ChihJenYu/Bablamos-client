import React from "react";
import { Mention, MentionsInput } from "react-mentions";
import Style from "../css/single-line.module.css";
import "../css/single-line.css";

function SingleLine({ value, data, onChange }) {
    return (
        <div>
            <MentionsInput
                className="mentions"
                classNames={Style}
                singleLine
                value={value}
                onChange={onChange}
            >
                <Mention
                    data={data}
                    className={Style.mentions__mention}
                    style={{ backgroundColor: "rgb(198, 218, 245)" }}
                />
            </MentionsInput>
        </div>
    );
}

export default SingleLine;

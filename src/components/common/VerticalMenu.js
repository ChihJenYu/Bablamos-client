import React, { useState } from "react";
import history from "../../history";
import { Dropdown, Menu } from "semantic-ui-react";
import "../../css/vertical-menu.css";

function VerticalMenu({ username }) {
    const [activeItem, setActiveItem] = useState("Home");

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <div className="left-vertical-menu">
            <Menu secondary vertical>
                <Menu.Item
                    name="Home"
                    active={activeItem === "Home"}
                    onClick={(e, { name }) => {
                        handleItemClick(e, { name });
                        history.push("/");
                    }}
                />
                <Menu.Item
                    name="Profile"
                    active={activeItem === "Profile"}
                    onClick={(e, { name }) => {
                        handleItemClick(e, { name });
                        history.push(`/profile/${username}`);
                    }}
                />
            </Menu>
        </div>
    );
}

export default VerticalMenu;

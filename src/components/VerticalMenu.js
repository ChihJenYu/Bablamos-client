import React, { useState } from "react";
import history from "../history";
import { Dropdown, Menu } from "semantic-ui-react";
import "../css/vertical-menu.css";

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
                    name="Messenger"
                    active={activeItem === "Messenger"}
                    onClick={(e, { name }) => {
                        handleItemClick(e, { name });
                        history.push("/messenger");
                    }}
                />
                <Dropdown text="Profile" pointing className="link item">
                    <Dropdown.Menu>
                        <Dropdown.Header>Go to...</Dropdown.Header>
                        <Dropdown.Item
                            onClick={() => {
                                history.push(`/profile/${username}`);
                            }}
                        >
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                history.push(
                                    `/profile/${username}/preferences/newsfeed`
                                );
                            }}
                        >
                            News feed settings
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                history.push(
                                    `/profile/${username}/preferences/users`
                                );
                            }}
                        >
                            Users settings
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </div>
    );
}

export default VerticalMenu;

import React, { useState, useEffect, useRef } from "react";
import "../../css/multiple-search-selection.css";

const MultipleSearchSelection = ({
    dropdownOptions,
    setDropdownOptions,
    selectedOptions,
    setSelectedOptions,
    fetchDropdownOptions,
}) => {
    const inputField = useRef();
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    const renderDropdownOptions = () => {
        return dropdownOptions.map((option) => {
            return (
                <div
                    key={option.id}
                    value={option.id}
                    className="item"
                    onClick={(e) => {
                        setSelectedOptions((prev) => [
                            ...prev,
                            { id: option.id, name: option.name },
                        ]);
                        e.target.classList.add("disabled");
                    }}
                >
                    {option.name}
                </div>
            );
        });
    };
    const renderSelectedOptions = () => {
        return selectedOptions.map((option) => {
            return (
                <a
                    key={option.id}
                    className="ui label transition visible"
                    style={{ display: "inline-block !important" }}
                >
                    {option.name}
                    <i
                        key={option.id}
                        className="delete icon"
                        onClick={() => {
                            setSelectedOptions((prev) =>
                                prev.filter((el) => el.id !== option.id)
                            );
                            let [itemToRemoveDisable] = Array.from(
                                document.querySelectorAll(
                                    ".menu.transition.visible .item"
                                )
                            ).filter(
                                (node) =>
                                    node.attributes.value.nodeValue == option.id
                            );
                            itemToRemoveDisable.classList.remove("disabled");
                        }}
                    />
                </a>
            );
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        // returns cleanup function
        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm !== "") {
            fetchDropdownOptions(debouncedTerm);
        }
    }, [debouncedTerm]);

    return (
        <div
            class="ui visible fluid multiple search selection dropdown"
            onClick={() => {
                inputField.current.focus();
            }}
        >
            <i className="dropdown icon" />
            {renderSelectedOptions()}
            <input
                ref={inputField}
                autocomplete="off"
                class="search"
                tabindex="0"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    if (e.target.value !== "") {
                        setShowPlaceholder(false);
                    } else {
                        setShowPlaceholder(true);
                        setDropdownOptions([]);
                    }
                    setSearchTerm(e.target.value);
                }}
            />
            <span className="sizer"></span>
            <div
                className="default text"
                style={!showPlaceholder ? { display: "none" } : null}
            >
                Pick some tags to let more people see your post!
            </div>
            <div className="menu transition visible">
                {renderDropdownOptions()}
            </div>
        </div>
    );
};

export default MultipleSearchSelection;

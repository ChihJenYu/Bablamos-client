import React, { useState, useEffect, useRef } from "react";
import "../css/floating-option.css";

// dropdownTexts is an array [{ component, option }]
function FloatingOptions({ defaultComponent, dropdownComponents }) {
    const ref = useRef();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                return;
            } else {
                setMenuOpen(false);
            }
        };

        document.body.addEventListener("click", onBodyClick, { capture: true });

        return () => {
            document.body.removeEventListener("click", onBodyClick, {
                capture: true,
            });
        };
    }, []);

    return (
        <div ref={ref} className="ui buttons button-group">
            {defaultComponent}
            <div
                className="ui floating dropdown icon button bablamos-theme"
                onClick={() => {
                    setMenuOpen(!menuOpen);
                }}
            >
                <i className="dropdown icon"></i>
                <div className={`menu ${menuOpen ? "visible" : "hidden"}`}>
                    {dropdownComponents}
                </div>
            </div>
        </div>
    );
}

export default FloatingOptions;

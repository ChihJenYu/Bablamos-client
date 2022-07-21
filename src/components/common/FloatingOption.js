import React, { useState, useEffect, useRef } from "react";
import "../../css/floating-option.css";

// dropdownTexts is an array [{ component, option }]
function FloatingOptions({ type, defaultComponent, dropdownComponents }) {
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
        <div
            ref={ref}
            className={`ui floating dropdown icon button ${type}`}
            onClick={() => {
                setMenuOpen(!menuOpen);
            }}
        >
            <div className="dropdown-button">{defaultComponent}</div>

            <div className={`menu ${menuOpen ? "visible" : "hidden"}`}>
                {dropdownComponents}
            </div>
        </div>
    );
}

export default FloatingOptions;

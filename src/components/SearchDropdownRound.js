import React, { useState, useEffect, useRef } from "react";
import Friend from "./Friend";
import "../css/search-dropdown-round.css";

function SearchDropdownRound({ fetch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    // [{ id, username, profile_pic_url }]
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultOpen, setSearchResultOpen] = useState(false);

    const ref = useRef();

    const fetchSearchResults = async () => {
        const data = await fetch(debouncedTerm);
        setSearchResults(data);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm !== "") {
            fetchSearchResults();
            setSearchResultOpen(true);
            return;
        }
        setSearchResults([]);
        setSearchResultOpen(false);
    }, [debouncedTerm]);

    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                return;
            } else {
                setSearchResults([]);
                setSearchResultOpen(false);
                ref.current.firstElementChild.value = "";
            }
        };

        document.body.addEventListener("click", onBodyClick, { capture: true });

        return () => {
            document.body.removeEventListener("click", onBodyClick, {
                capture: true,
            });
        };
    }, []);

    const renderSearchResults = () => {
        return searchResults.map((user) => {
            return (
                <div className="search-result item">
                    <Friend
                        key={user.id}
                        profile_pic_url={user.profile_pic_url}
                        username={user.username}
                        type="search"
                    />
                </div>
            );
        });
    };

    return (
        <div
            ref={ref}
            style={{ position: "relative" }}
            className="ui icon input"
        >
            <input
                type="text"
                placeholder="Search Bablamos"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
                className={searchResults.length > 0 ? "round-top" : ""}
            />
            <i className="search link icon"></i>
            {searchResultOpen ? (
                <div
                    className="search-results"
                    style={{ position: "absolute" }}
                >
                    {renderSearchResults()}
                </div>
            ) : null}
        </div>
    );
}

export default SearchDropdownRound;

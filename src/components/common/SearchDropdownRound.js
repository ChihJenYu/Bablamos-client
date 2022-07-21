import React, { useState, useEffect, useRef } from "react";
import Friend from "../common/Friend";
import history from "../../history";
import "../../css/search-dropdown-round.css";

function SearchDropdownRound({ fetch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    // [{ index, user_id, username, profile_pic_url, post_id, content }]
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultOpen, setSearchResultOpen] = useState(false);
    const [hideDropdownAfterInput, setHideDropdownAfterInput] = useState(false);
    const ref = useRef();

    const fetchSearchResults = async (term) => {
        const data = await fetch(term);
        setSearchResults(data);
    };

    const onSearch = (term) => {
        history.push(`/search?kw=${term}`);
        setSearchResultOpen(false);
    };

    useEffect(() => {
        if (!hideDropdownAfterInput) {
            const timeout = setTimeout(() => {
                setDebouncedTerm(searchTerm);
            }, 500);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm !== "") {
            fetchSearchResults(debouncedTerm);
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
        if (searchResults.length === 0) {
            return (
                <div
                    className="search-result item"
                    id="detail-search-prompt"
                    onClick={() => {
                        onSearch(debouncedTerm);
                    }}
                >
                    Search{" "}
                    {debouncedTerm.length > 150
                        ? debouncedTerm.slice(0, 150) + "..."
                        : debouncedTerm}
                </div>
            );
        }
        return searchResults.map((result, index) => {
            if (index === searchResults.length - 1) {
                return (
                    <>
                        <div className="search-result item">
                            <Friend
                                key={
                                    "" + result.user_id ||
                                    "" + result.post_id + ""
                                }
                                profile_pic_url={result.profile_pic_url}
                                username={result.username}
                                type="search"
                            />
                        </div>
                        <div
                            className="search-result item"
                            id="detail-search-prompt"
                            onClick={() => {
                                onSearch(debouncedTerm);
                            }}
                        >
                            Search{" "}
                            {debouncedTerm.length > 150
                                ? debouncedTerm.slice(0, 150) + "..."
                                : debouncedTerm}
                        </div>
                    </>
                );
            }
            return (
                <div className="search-result item">
                    <Friend
                        key={"" + result.user_id || "" + result.post_id + ""}
                        profile_pic_url={result.profile_pic_url}
                        username={result.username}
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
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setHideDropdownAfterInput(true);
                        onSearch(searchTerm);
                    }
                }}
                onChange={(e) => {
                    setHideDropdownAfterInput(false);
                    setSearchTerm(e.target.value);
                }}
                value={searchTerm}
                className={searchResultOpen ? "round-top" : ""}
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

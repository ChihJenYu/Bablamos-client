import React, { useState, useEffect, useRef } from "react";
import Newsfeed from "../newsfeed/Newsfeed";
import "../../css/semantic.min.css";
import "../../css/search.css";
import { getUserInfo } from "../../apis/user";
import HomepageFrame from "./HomepageFrame";
import { useLocation } from "react-router-dom";
import Loader from "../common/Loader";
import Friend from "../common/Friend";
import { InView } from "react-intersection-observer";
import { searchPosts } from "../../apis/post";
import { searchUsers } from "../../apis/user";
import qs from "qs";
function Search({ clientSocket, setClientSocket }) {
    let { search } = useLocation();
    const kw = qs.parse(search, { ignoreQueryPrefix: true }).kw;
    const [user, setUser] = useState({
        user_id: null,
        username: null,
        profile_pic_url: null,
    });
    const [posts, setPosts] = useState([]);
    const [postsPaging, setPostsPaging] = useState(0);
    const [postsHaveReachedEnd, setPostsHaveReachedEnd] = useState(false);
    const [atPosts, setAtPosts] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersPaging, setUsersPaging] = useState(0);
    const [usersHaveReachedEnd, setUsersHaveReachedEnd] = useState(false);
    const endMessage = (
        <p
            style={{
                textAlign: "center",
                paddingBottom: "1em",
            }}
        >
            <b>That's all we could find!</b>
        </p>
    );
    const searchControlRef = useRef();

    const fetchUserInfo = async () => {
        const json = await getUserInfo(window.localStorage.getItem("auth"));
        setUser(json.data);
        if (clientSocket.user_id !== json.data.user_id) {
            setClientSocket((prev) => {
                return { ...prev, user_id: json.data.user_id };
            });
        }
    };

    const fetchUsers = async (refresh) => {
        const json = await searchUsers(
            "detail",
            kw,
            refresh ? 0 : usersPaging,
            window.localStorage.getItem("auth")
        );
        if (json.data.length === 0) {
            setUsersHaveReachedEnd(true);
            if (refresh) {
                setUsersPaging(0);
                setUsers([]);
            }
            return;
        }
        setUsersPaging(refresh ? 1 : usersPaging + 1);
        setUsers((prev) =>
            refresh ? [...json.data] : [...prev, ...json.data]
        );
    };

    const fetchPosts = async (refresh) => {
        const json = await searchPosts(
            kw,
            refresh ? 0 : postsPaging,
            window.localStorage.getItem("auth")
        );
        if (json.data.length === 0) {
            setPostsHaveReachedEnd(true);
            if (refresh) {
                setPostsPaging(0);
                setPosts([]);
            }
            return;
        }
        setPostsPaging(refresh ? 1 : postsPaging + 1);
        setPosts((prev) =>
            refresh ? [...json.data] : [...prev, ...json.data]
        );
    };

    const renderUsers = () => {
        return users.map((user, index) => {
            if (index === users.length - 1) {
                return (
                    <InView
                        as="div"
                        className="search-result item"
                        threshold={0.01}
                        onChange={(inView) => {
                            if (inView) {
                                fetchUsers();
                            }
                        }}
                    >
                        <Friend
                            profile_pic_url={user.profile_pic_url}
                            username={user.username}
                            type="search"
                        />
                    </InView>
                );
            }
            return (
                <div className="search-result item">
                    <Friend
                        profile_pic_url={user.profile_pic_url}
                        username={user.username}
                        type="search"
                    />
                </div>
            );
        });
    };

    const searchTabsStyle = {
        marginTop:
            "" +
            (searchControlRef.current
                ? 18 + searchControlRef.current.offsetHeight
                : "") +
            "px",
    };

    const renderSearchTabs = () => {
        if (atPosts) {
            return (
                <div style={searchTabsStyle} className="index-news-feed search">
                    <Newsfeed
                        user_id={user.user_id}
                        profile_pic_url={user.profile_pic_url}
                        posts={posts}
                        fetchPosts={fetchPosts}
                        hasReachedEnd={postsHaveReachedEnd}
                        endMessage={endMessage}
                        type="search"
                        clientSocket={clientSocket}
                        setClientSocket={setClientSocket}
                    />
                </div>
            );
        } else {
            return (
                <div
                    style = { searchTabsStyle }
                    className="user-search-result"
                >
                    <div className="users-results">{renderUsers()}</div>
                    {usersHaveReachedEnd ? (
                        <div style={{ marginTop: "8px" }}>{endMessage}</div>
                    ) : null}
                </div>
            );
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        fetchUsers(true);
        fetchPosts(true);
    }, [search]);

    return user.user_id && clientSocket.user_id ? (
        <div>
            <HomepageFrame
                user={user}
                clientSocket={clientSocket}
                setClientSocket={setClientSocket}
            />
            <div className="search-menu">
                <div ref={searchControlRef} className="search-tab-control">
                    <h3>
                        Showing results for "
                        {kw.length > 150 ? kw.slice(0, 150) + "..." : kw}" 👇
                    </h3>
                    <div className="ui secondary pointing menu ">
                        <a
                            className={`${atPosts ? "" : "active"} item`}
                            onClick={() => {
                                setAtPosts(false);
                            }}
                        >
                            People
                        </a>
                        <a
                            className={`${atPosts ? "active" : ""} item`}
                            onClick={() => {
                                setAtPosts(true);
                            }}
                        >
                            Posts
                        </a>
                    </div>
                </div>

                {renderSearchTabs()}
            </div>
        </div>
    ) : null;
}

export default Search;

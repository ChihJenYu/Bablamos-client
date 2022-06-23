import React, { useState, useEffect } from "react";
import "../css/friends-tab-content.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import Friend from "./Friend";

function FriendsTabContent({ profileUser }) {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsPaging, setFriendsPaging] = useState(0);
    const [friendRequestsPaging, setFriendRequestsPaging] = useState(0);
    const tabs = ["All friends", "Friend requests"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const renderedFriends = friends.map((friend) => {
        return (
            <Friend
                status="accepted"
                profile_pic_url={friend.profile_pic_url}
                username={friend.friend_name}
            />
        );
    });

    const renderedFriendRequests = friendRequests.map((req) => {
        return (
            <Friend
                status="received"
                profile_pic_url={req.profile_pic_url}
                username={req.friend_name}
            />
        );
    });

    const fetchFriends = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/friend?id=${profileUser.user_id}&status=accepted&paging=${friendsPaging}`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            }
        );
        const json = await res.json();
        setFriendsPaging(friendsPaging + 1);
        setFriends((prev) => [...prev, ...json.data]);
    };

    const fetchFriendRequests = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/friend?id=${profileUser.user_id}&status=received&paging=${friendRequestsPaging}`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
            }
        );
        const json = await res.json();
        setFriendRequestsPaging(friendRequestsPaging + 1);
        setFriendRequests((prev) => [...prev, ...json.data]);
    };

    useEffect(() => {
        fetchFriends();
        fetchFriendRequests();
    }, []);

    return (
        <div className="friends-tab-content">
            <div className="tab-content-container friends-tab">
                <div className="friends-tab-header">
                    <div className="ui secondary pointing menu">
                        <div className="left menu">
                            <a
                                className={`item ${
                                    activeTab === "All friends" ? "active" : ""
                                }`}
                                onClick={() => {
                                    setActiveTab("All friends");
                                }}
                            >
                                All friends
                            </a>
                            <a
                                className={`item ${
                                    activeTab === "Friend requests"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => {
                                    setActiveTab("Friend requests");
                                }}
                            >
                                Friend requests
                            </a>
                        </div>
                        <div className="right menu">
                            <div className="search item">
                                <div className="ui icon input">
                                    <input
                                        type="text"
                                        placeholder="Search friends"
                                    />
                                    <i className="search link icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {profileUser && activeTab === "All friends" ? (
                    <InfiniteScroll
                        dataLength={friends.length}
                        next={fetchFriends}
                        hasMore={true}
                        loader={<Loader text="Loading" />}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Nani (´ﾟдﾟ`) ... You've seen it all!</b>
                            </p>
                        }
                    >
                        <div className="ui items friends">
                            {renderedFriends}
                        </div>
                    </InfiniteScroll>
                ) : null}
                {profileUser && activeTab === "Friend requests" ? (
                    <InfiniteScroll
                        dataLength={friendRequests.length}
                        next={fetchFriendRequests}
                        hasMore={true}
                        loader={<Loader text="Loading" />}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Nani (´ﾟдﾟ`) ... You've seen it all!</b>
                            </p>
                        }
                    >
                        <div className="ui items friends">
                            {renderedFriendRequests}
                        </div>
                    </InfiniteScroll>
                ) : null}
            </div>
        </div>
    );
}

export default FriendsTabContent;

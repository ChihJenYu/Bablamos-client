import React, { useState } from "react";
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
    const [friendsHasReachedEnd, setFriendsHasReachedEnd] = useState(false);
    const [requestsHasReachedEnd, setRequestsHasReachedEnd] = useState(false);

    const renderedFriends = friends.map((friend) => {
        return (
            <Friend
                key={friend.id}
                status="accepted"
                profile_pic_url={friend.profile_pic_url}
                username={friend.friend_name}
            />
        );
    });

    const renderedFriendRequests = friendRequests.map((req) => {
        return (
            <Friend
                key={req.id}
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
        if (json.data.length === 0) {
            setFriendsHasReachedEnd(true);
            return;
        }
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
        if (json.data.length === 0) {
            setRequestsHasReachedEnd(true);
            return;
        }
        setFriendRequestsPaging(friendRequestsPaging + 1);
        setFriendRequests((prev) => [...prev, ...json.data]);
    };

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
                            {profileUser.friend_status === "self" ? (
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
                            ) : null}
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
                        hasMore={!friendsHasReachedEnd}
                        loader={<Loader text="Loading" />}
                        endMessage={
                            <p
                                className="end-message"
                                style={{ textAlign: "center" }}
                            >
                                That's all of 'em!
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
                        hasMore={!requestsHasReachedEnd}
                        loader={<Loader text="Loading" />}
                        endMessage={
                            <p
                                className="end-message"
                                style={{ textAlign: "center" }}
                            >
                                That's all of 'em!
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

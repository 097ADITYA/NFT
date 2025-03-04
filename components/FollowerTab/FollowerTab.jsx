import React, { useState, useEffect } from "react";
import {
  RiUserFollowFill,
  RiUserUnfollowFill,
  RiAwardLine,
} from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";
import images from "../../img";

const FollowerTab = () => {
  const CardArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      name: "Jackson Baker",
      seller: "",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      name: "Giada Mann",
      seller: "",
    },
    {
      background: images.creatorbackground3,
      user: images.user10,
      name: "Easton Johnson",
      seller: "",
    },
    {
      background: images.creatorbackground4,
      user: images.user3,
      name: "Everly Williams",
      seller: "",
    },
    {
      background: images.creatorbackground5,
      user: images.user4,
      name: "Sofia Brown",
      seller: "",
    },
    {
      background: images.creatorbackground6,
      user: images.user5,
      name: "Harrison Garcia",
      seller: "",
    },
    {
      background: images.creatorbackground7,
      user: images.user6,
      name: "Emma Jones",
      seller: "",
    },
    {
      background: images.creatorbackground11,
      user: images.user8,
      name: "Olivia Miller",
      seller: "",
    },
  ];
  const FollowingArray = [
    {
      background: images.creatorbackground3,
      user: images.user10,
      name: "Easton Johnson",
      seller: "",
    },
    {
      background: images.creatorbackground4,
      user: images.user3,
      name: "Everly Williams",
      seller: "",
    },
    {
      background: images.creatorbackground5,
      user: images.user4,
      name: "Sofia Brown",
      seller: "",
    },
    {
      background: images.creatorbackground6,
      user: images.user5,
      name: "Harrison Garcia",
      seller: "",
    },
    {
      background: images.creatorbackground7,
      user: images.user6,
      name: "Emma Jones",
      seller: "",
    },
  ];
  const NewsArray = [
    {
      background: images.creatorbackground3,
      user: images.user10,
      name: "Easton Johnson",
      seller: "",
    },
    {
      background: images.creatorbackground4,
      user: images.user3,
      name: "Everly Williams",
      seller: "",
    },

    {
      background: images.creatorbackground7,
      user: images.user6,
      name: "Emma Jones",
      seller: "",
    },
    {
      background: images.creatorbackground11,
      user: images.user8,
      name: "Olivia Miller",
      seller: "",
    },
  ];

  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const openPopular = () => {
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };
  const openFollower = () => {
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };
  const openNews = () => {
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };

  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2> Top Creators List..</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button onClick={() => openPopular()}>
              <RiUserFollowFill /> Popular
            </button>
            <button onClick={() => openFollower()}>
              <RiUserFollowFill /> Following
            </button>
            <button onClick={() => openNews()}>
              <RiAwardLine /> NoteWorthy
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.followerTab_box}>
          {CardArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {FollowingArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {news && (
        <div className={Style.followerTab_box}>
          {NewsArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <a >Show me more</a>
          <a >Become, author</a>
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
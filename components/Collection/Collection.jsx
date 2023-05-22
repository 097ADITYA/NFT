import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import images from "../../img";

const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const CardArray = [
    {
      background: images.creatorbackground12,
      user: images.user1,
      Images: images.nft1,
      Imagess: images.nfts9,
      Image: images.nft17
    },
    {
      background: images.creatorbackground13,
      user: images.user2,
      Images: images.nft2,
      Imagess: images.nfts10,
      Image: images.nft18
    },
    {
      background: images.creatorbackground16,
      user: images.user3,
      Images: images.nft3,
      Imagess: images.nfts11,
      Image: images.nft19
    },
    {
      background: images.creatorbackground17,
      user: images.user4,
      Images: images.nft4,
      Imagess: images.nfts12,
      Image: images.nft20
    },
    {
      background: images.creatorbackground15,
      user: images.user5,
      Images: images.nft5,
      Imagess: images.nfts13,
      Image: images.nft21
    },
    {
      background: images.creatorbackground18,
      user: images.user6,
      Images: images.nft6,
      Imagess: images.nfts14,
      Image: images.nft22
    },
    
  ];
  const newsArray = [
    {
      background: images.creatorbackground13,
      user: images.user2,
      Images: images.nft2,
      Imagess: images.nfts10,
      Image: images.nft18
    },

    {
      background: images.creatorbackground15,
      user: images.user5,
      Images: images.nft5,
      Imagess: images.nfts13,
      Image: images.nft21
    },
    {
      background: images.creatorbackground17,
      user: images.user4,
      Images: images.nft4,
      Imagess: images.nfts12,
      Image: images.nft20
    },
    
  ];
  const followingArray = [
    {
      background: images.creatorbackground13,
      user: images.user2,
      Images: images.nft2,
      Imagess: images.nfts10,
      Image: images.nft18
    },
    {
      background: images.creatorbackground17,
      user: images.user4,
      Images: images.nft4,
      Imagess: images.nfts12,
      Image: images.nft20
    },
    {
      background: images.creatorbackground12,
      user: images.user1,
      Images: images.nft1,
      Imagess: images.nfts9,
      Image: images.nft17

    },
    {
      background: images.creatorbackground15,
      user: images.user5,
      Images: images.nft5,
      Imagess: images.nfts13,
      Image: images.nft21
    },
    
  ];

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
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button onClick={() => openPopular()}>
              <BsFillAlarmFill /> 24 hours
            </button>
            <button onClick={() => openFollower()}>
              <BsCalendar3 /> 7 days
            </button>
            <button onClick={() => openNews()}>
              <BsFillCalendarDateFill /> 30 days
            </button>
          </div>
        </div>
      </div>
      {popular && (
        <div className={Style.collection_box}>
          {CardArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.collection_box}>
          {followingArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {news && (
        <div className={Style.collection_box}>
          {newsArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
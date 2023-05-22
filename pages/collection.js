import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

const collection = () => {
  const collectionArray = [
    images.c1,
    images.c2,
    images.c3,
    images.c4,
    images.c5,
    images.c6,
    images.c7,
    images.c8,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.grid1} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />

      <Slider />
      
    </div>
  );
};

export default collection;
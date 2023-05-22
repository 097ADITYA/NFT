import React, { useState, useEffect, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext, setError } from "../Context/NFTMarketplaceContext";

const searchPage = () => {

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNFTs] = useState([]);
  const [nftsCopys, setNftCopys] = useState([]);

  useEffect(() => {
    
        fetchNFTs().then((item) => {
        //setNFTs(item.reverse());
        setNftCopys(item);
      });
     
    });
  

  const collectionArray = [
    images.a1,
    images.a2,
    images.a3,
    images.a4,
    images.a5,
    images.a6,
    images.a7,
    images.a8

  ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.grid1} />
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      
    </div>
  );
};

export default searchPage;
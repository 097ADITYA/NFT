import React from "react";

//INTERNAL IMPORT
import { Button, Category } from "../components/componentsindex";
import NFTDetailsPage from "../NFTdetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Category />
    </div>
  );
};

export default NFTDetails;

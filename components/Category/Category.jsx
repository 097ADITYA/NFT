import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    {
      background: images.dance,
      name: "Dance",
    },
    {
      background: images.sport,
      name: "Sports",
    },
    {
      background: images.entertainment,
      name: "Entirtment Art",
    },
    {
      background: images.photography,
      name: "Photography",
    },
    {
      background: images.nftmusicbackground,
      name: "Music",
    },
    {
      background: images.digital,
      name: "Digital Arts",
    },
  ];
  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={1 + 1}>
            <Image
              src={el.background}
              className={Style.category_box_img}
              alt="Background image"
              width={203}
              height={160}
              objectFit="cover"
            />

            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>{el.name}</h4>
                <small>1995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
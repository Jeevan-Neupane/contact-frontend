import React from "react";
import { Image, ImageDiv } from "./style";
import girl from "../../assets/girl.svg";
function GirlPhoto() {
  return (
    <ImageDiv>
      <Image src={girl} />
    </ImageDiv>
  );
}

export default GirlPhoto;

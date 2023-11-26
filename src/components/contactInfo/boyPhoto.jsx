import React from "react";
import { Image, ImageDiv } from "./style";
import boy from "../../assets/boy.svg";
function BoyPhoto() {
  return (
    <ImageDiv>
      <Image src={boy} />
    </ImageDiv>
  );
}

export default BoyPhoto;

import React from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  position: relative;
  background: url("https://i.imgur.com/mMWUOrD.jpg") no-repeat center / cover;
  height: 600px;
  width: 100%;
`;

export default function Banner() {
  return <BannerContainer></BannerContainer>;
}

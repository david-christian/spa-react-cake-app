import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY } from "../../constants/constants";

const FooterContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 15px 60px;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  letter-spacing: 1.1px;

  ${MEDIA_QUERY} {
    flex-direction: column;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <div>※ 本站僅供測試使用，請勿留下真實資訊</div>
      <div>Copyright © 2020 Powered by React.js</div>
    </FooterContainer>
  );
}

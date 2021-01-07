import React from 'react';
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  padding: 10px 100px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
`;

function Footer() {
  return (
    <FooterWrapper>
      <p>Footer</p>
    </FooterWrapper>
  )
}

export {Footer}
import React from 'react';
import Logo from "./logo.svg";
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #02101f;
`;

const Image = styled.img`
  height: 30px;
  margin-right: 20px;
`;

const LinkWrapper = styled(NavLink)`
  color: white;
  padding: 10px 15px;
  &:hover{
    background: #1890ff;
  }
  &.active {
    padding: 10px 15px 6px 15px;
    background: #1890ff;
    border-bottom: 4px solid #86c2ff;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Image src={Logo} alt="加载失败"/>
      <LinkWrapper exact to="/" activeClassName="active">首页</LinkWrapper>
      <LinkWrapper to="/history" activeClassName="active">历史记录</LinkWrapper>
      <LinkWrapper to="/about" activeClassName="active">关于我</LinkWrapper>
    </HeaderWrapper>
  )
}

export {Header}
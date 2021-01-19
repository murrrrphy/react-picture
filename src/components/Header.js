import React, {useEffect} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'
import { useStores } from '../stores'
import {observer} from 'mobx-react'
import Icon from './Icon'

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #3b4754;
  .icon {
    fill: #0fc080;
    margin-right: 20px;
  }
`;

const User =styled.div`
  display: flex;
  align-items: center;
`

const LinkWrapper = styled(NavLink)`
  position: relative;
  display: inline-block;
  color: white;
  padding: 20px 20px;
  transition: transform 0.3s;
  transform-origin: 50% 0;
  transform-style: preserve-3d;
  &:hover{
    background: #262e37;
    transform: rotateX(90deg) translateY(-22px);
    color: white;
  }
  &.active {
    background: #0965a0;
    transform: rotateX(90deg) translateY(-22px);
  }
  &::before {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0965a0;
    content: attr(data-hover);
    transition: background 0.3s;
    transform: rotateX(-90deg);
    transform-origin: 50% 0;
  }
`;

const Login = styled.div`
  margin-left: auto;
  color: white;
  strong {
    font-size: 16px;
  }
`;

const ButtonWrapper = styled(Button)`
  margin-left: 10px;
  border-radius: 16px;
`;

const Layout = styled(ButtonWrapper)`
  background: #3b4754;
  padding: 4px 36px;
  border-radius: 16px;
  border: none;
  display: flex;
  align-items: center;
  position: relative;
  .icon {
    position: absolute;
    fill: white;
    height: 1em;
    width: 1em;
    opacity: 0;
    left: 96px;
    cursor: pointer;
    transition: all 0.3s;
  }
  &:hover{
    background: #e81123;
    .icon {
      opacity: 1;
      left: 100px;
    }
  }
`;

const  Header = observer(() => {
  const history = useHistory();
  const { UserStore, AuthStore } = useStores()

  const handleLogout = () => {
    AuthStore.logout()
    history.push('/')
  }

  const handleLogin = () => {
    history.push('/login')
  }

  const handleRegister = () => {
    history.push('/register')
  }

  useEffect(()=>{
    UserStore.pullUser();
    // eslint-disable-next-line
  },[])

  return (
    <HeaderWrapper>
      <Icon name="M"/>
      <LinkWrapper exact to="/" activeClassName="active" data-hover="首页">首页</LinkWrapper>
      <LinkWrapper to="/history" activeClassName="active" data-hover="历史记录">历史记录</LinkWrapper>
      <LinkWrapper to="/about" activeClassName="active" data-hover="关于我">关于我</LinkWrapper>
      <Login>
        {UserStore.currentUser?
          <User>
            <strong>Hello,{UserStore.currentUser.attributes.username}</strong>
            <Layout type="primary" onClick={handleLogout}>退出登录<Icon name="right"/></Layout>
          </User>
          :
          <>
            <ButtonWrapper type="primary" onClick={handleLogin}>
              登录
            </ButtonWrapper>
            <ButtonWrapper type="primary" onClick={handleRegister}>
              注册
            </ButtonWrapper>
          </>}
      </Login>
    </HeaderWrapper>
  )
})

export {Header}
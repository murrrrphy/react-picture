import React from 'react'
import Logo from "./logo.svg"
import {NavLink, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'
import { useStores } from '../stores'
import {observer} from 'mobx-react'

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #02101f;
`

const Image = styled.img`
  height: 30px;
  margin-right: 20px;
`

const LinkWrapper = styled(NavLink)`
  color: white;
  padding: 10px 15px;
  &:hover{
    background: #1890ff;
    color: white;
  }
  &.active {
    padding: 10px 15px 6px 15px;
    background: #1890ff;
    border-bottom: 4px solid #86c2ff;
  }
`;

const Login = styled.div`
  margin-left: auto;
  color: white;
`;

const ButtonWrapper = styled(Button)`
  margin-left: 10px;
`;

const  Header = observer(() => {
  const history = useHistory();
  const { UserStore, AuthStore } = useStores()

  const handleLogout = () => {
    AuthStore.logout()
  }

  const handleLogin = () => {
    history.push('/login')
  }

  const handleRegister = () => {
    history.push('/register')
  }

  return (
    <HeaderWrapper>
      <Image src={Logo} alt="加载失败"/>
      <LinkWrapper exact to="/" activeClassName="active">首页</LinkWrapper>
      <LinkWrapper to="/history" activeClassName="active">历史记录</LinkWrapper>
      <LinkWrapper to="/about" activeClassName="active">关于我</LinkWrapper>
      <Login>
        {UserStore.currentUser?
          <>
            Hello,{UserStore.currentUser.attributes.username}
            <ButtonWrapper type="primary" onClick={handleLogout}>注销</ButtonWrapper>
          </>
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
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

const LinkWrapper = styled(NavLink)`
  color: white;
  padding: 10px 15px;
  &:hover{
    background: #262e37;
    color: white;
  }
  &.active {
    padding: 10px 15px 6px 15px;
    background: #262e37;
    border-bottom: 4px solid #4a88c7;
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
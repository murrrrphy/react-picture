import React from 'react'
import {useStores} from '../stores/index'
import {Form, Input, Button, message} from 'antd'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 0 4px 14px 3px rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
`;

const P = styled.p`
  margin-left: 90px;
  button {
    border: none;
    background: #fff;
    color: #007bff;
    outline: none;
    cursor: pointer;
    padding: 0;
  }
`

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 11,
    span: 13,
  },
}

const Login = () => {
  const history = useHistory();
  const { AuthStore } = useStores()
  const onFinish = (values) => {
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.login()
      .then(()=>{
        message.success('登录成功')
        history.push('/')
      })
      .catch((e)=>{
        if(e.toString().indexOf('The username and password mismatch')>0){
          message.error('密码错误，登录失败')
        }else if(e.toString().indexOf('Could not find user')>0){
          message.error('用户名不存在，请确认用户名或注册账号')
        }else if(e.toString().indexOf('登录失败次数超过限制')>0){
          message.error('登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。')
        }else {
          message.error('发生未知错误，请稍后再试')
        }
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleRegister = () => {
    history.push('/register')
  }

  return (
    <Wrapper>
      <Header>登录</Header>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            }
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            }
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <P>还没注册？<button onClick={handleRegister}>注册</button></P>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default Login
import React from 'react'
import {useStores} from '../stores/index'
import {Form, Input, Button} from 'antd'
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
    offset: 8,
    span: 16,
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
        history.push('/')
      })
      .catch((e)=>{
        console.log(e)
        console.log('登录失败，什么都不做')
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
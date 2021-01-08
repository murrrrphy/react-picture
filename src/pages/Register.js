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

const Register = () => {
  const history = useHistory();
  const { AuthStore } = useStores()
  const onFinish = (values) => {
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.register()
      .then(()=>{
        history.push('/login')
      })
      .catch(()=>{
        console.log('注册失败，什么都不做')
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const validates = {
    username: (rule,value) => {
      if(value.length < 4 || value.length > 12) return Promise.reject('用户名长度只能为4~12个字符');
      if(!(/^[0-9a-zA-Z_]+$/.test(value))) return Promise.reject('用户名只能由数字、字母和下划线组成')
      return Promise.resolve()
    },
    password: (rule, value) => {
      if(value.length < 6) return Promise.reject('密码最小长度为6');
      if(value.length > 16) return Promise.reject('密码最大长度为16');
      return Promise.resolve()
    }
  }

  const validateConfirm = ({getFieldValue}) => ({
    validator(rule,value){
      if(getFieldValue('password') === value) return Promise.resolve();
      return Promise.reject('两次输入密码不一致')
    }
  })


  return (
    <Wrapper>
      <Header>注册</Header>
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
            },
            {validator: validates.username}
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
            },
            {validator: validates.password}
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '请再次输入密码！',
            },
            validateConfirm
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

export default Register
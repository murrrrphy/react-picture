import React from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'
import Title from '../components/Title'

const Tips = styled.div`
  text-align: center;
  background: #f90;
  padding: 10px;
  margin: 30px 0;
  color: #fff;
  border-radius: 4px;
`;

const Component = observer(({children}) => {
  const {UserStore, ImageStore} = useStores()
  return (
    <div>
      {UserStore.currentUser ?
        (ImageStore.serverFile ? null : <Title>请上传您的图片</Title>)
        :
        <Tips>{children}</Tips>
      }
    </div>
  )
})

export default Component
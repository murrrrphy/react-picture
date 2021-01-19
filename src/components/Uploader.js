import React from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import {Upload, message, Spin} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import UploaderResult from './UploaderResult'
import styled from 'styled-components'

const {Dragger} = Upload

const DraggerWrapper = styled(Dragger)`
  margin-top: 32px;
`

const Component = observer(() => {
  const {ImageStore, UserStore} = useStores()
  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传!')
        return false
      }
      if(!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)){
        message.error('只能上传png/svg/jpg/gif格式的图片')
        return false
      }
      if(file.size > 1024*1024){
        message.error('图片尺寸最大1M')
        return false
      }
      ImageStore.uploader()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        }).catch(() => {
        console.log('上传失败')
      })
      return false
    }
  }

  return (
    <div>
      <Spin tip="上传中..." spinning={ImageStore.isLoading}>
        <DraggerWrapper {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击或拖拽上传图片</p>
          <p className="ant-upload-hint">
            仅支持.png/.svg/.jpg/.jpeg/.gif格式的图片
          </p>
        </DraggerWrapper>
      </Spin>
      <UploaderResult/>
    </div>
  )
})

export default Component
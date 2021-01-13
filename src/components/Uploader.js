import React, {useRef} from 'react'
import {useStores} from '../stores'
import {observer, useLocalObservable} from 'mobx-react'
import {Upload, message, Spin} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import styled from 'styled-components'

const {Dragger} = Upload

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`

const H1 = styled.h1`
  text-align: center;
  margin: 20px 0;
`

const Image = styled.img`
  max-width: 300px;
  
`

const Component = observer(() => {
  const refWidth = useRef()
  const refHeight = useRef()
  const {ImageStore, UserStore} = useStores()
  const store = useLocalObservable(() => ({
    width: null,
    setWidth (width){
      store.width = width
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },
    height: null,
    setHeight (height){
      store.height = height
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },
    get fullStr() {
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    }
  }))
  const bingWidthChange = () => {
    store.setWidth(refWidth.current.value)
  }
  const bingHeightChange = () => {
    store.setHeight(refHeight.current.value)
  }
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
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击或拖拽上传图片</p>
          <p className="ant-upload-hint">
            仅支持.png/.svg/.jpg/.jpeg/.gif格式的图片
          </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile ? <Result>
          <H1>上传结果</H1>
          <dl>
            <dt>线上地址</dt>
            <dd>
              <a rel="noreferrer" target="_blank" href={ImageStore.serverFile.attributes.url.attributes.url}>
                {ImageStore.serverFile.attributes.url.attributes.url}
              </a>
            </dd>
            <dt>文件名</dt>
            <dd>{ImageStore.filename}</dd>
            <dt>图片预览</dt>
            <dd>
              <Image src={ImageStore.serverFile.attributes.url.attributes.url} alt="加载失败"/>
            </dd>
            <dt>更多尺寸</dt>
            <dd>
              <input ref={refWidth} onChange={bingWidthChange} placeholder="最大宽度(可选)"/>
              <input ref={refHeight} onChange={bingHeightChange} placeholder="最大高度(可选)"/>
            </dd>
            <dd>
              <a target="_blank" rel="noreferrer" href={store.fullStr}>{store.fullStr}</a>
            </dd>
          </dl>
        </Result> : null
      }
    </div>
  )
})

export default Component
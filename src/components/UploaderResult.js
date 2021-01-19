import React, {useRef} from 'react'
import {useStores} from '../stores'
import {observer, useLocalObservable} from 'mobx-react'
import styled from 'styled-components'


const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`

const Image = styled.img`
  max-width: 300px;
`

const Hr = styled.div`
  margin: 5px 0;
  border-bottom: 1px solid #ddd;
`

const Space = styled.div`
  height: 20px;
`

const Dt = styled.dt`
  font-weight: bold;
`

const Component = observer(() => {
  const refWidth = useRef()
  const refHeight = useRef()
  const {ImageStore} = useStores()
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

  return (
    <div>
      {
        ImageStore.serverFile ? <Result>
          <H1>上传结果</H1>
          <dl>
            <Dt>线上地址</Dt>
            <Hr/>
            <dd>
              <a rel="noreferrer" target="_blank" href={ImageStore.serverFile.attributes.url.attributes.url}>
                {ImageStore.serverFile.attributes.url.attributes.url}
              </a>
            </dd>
            <Space/>
            <Dt>文件名</Dt>
            <Hr/>
            <dd>{ImageStore.filename}</dd>
            <Space/>
            <Dt>图片预览</Dt>
            <Hr/>
            <dd>
              <Image src={ImageStore.serverFile.attributes.url.attributes.url} alt="加载失败"/>
            </dd>
            <Space/>
            <Dt>更多尺寸</Dt>
            <Hr/>
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
import React from 'react'
import styled from 'styled-components'
import Icon from '../components/Icon'

const Title = styled.div`
  font-size: 40px;
  font-weight: 500;
`

const Green = styled.div`
  border: 1px solid #7ee281;
  border-radius: 4px;
  background: #c3f5cf;
  color: #155724;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 20px 0;
  .icon {
    fill: #155724;
    margin-right: 16px;
  }
`

const Red = styled.div`
  border: 1px solid #f7aeae;
  border-radius: 4px;
  background: #ffcccc;
  color: #841c1c;
  font-size: 16px;
  padding: 10px 20px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
    .icon {
    fill: #841c1c;
    display: inline-block;
    margin-right: 16px;
  }
  strong {
    font-size: 24px;
  }
`

function About() {
  return (
    <div>
      <Title>关于墨菲图床</Title>
      <hr/>
      <Green>
        <Icon name="smile"/>
        墨菲免费图床仅供分享图片使用，我们保留随时删除图片并举报上传违规图片者的权利
      </Green>
      <Red>
        <TitleWrapper>
          <Icon name="cry"/>
          <strong>严禁上传及分享如下类型的图片：</strong>
        </TitleWrapper>
        <ul>
          <li>含有色情、暴力、宣扬恐怖主义的图片</li>
          <li>侵犯版权、未经授权的图片</li>
          <li>其他违反中华人民共和国法律的图片</li>
          <li>其他违反香港法律的图片</li>
        </ul>
      </Red>
    </div>
  )
}

export default About
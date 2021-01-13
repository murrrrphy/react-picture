import React from 'react';
import Uploader from '../components/Uploader'
import Tips from '../components/Tips'
import {observer} from 'mobx-react'

const  Home = observer(() => {
  return (
    <div>
      <Tips>请先登录再上传</Tips>
      <Uploader />
    </div>
  )
})

export default Home
import React from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores/index'

const  Login = observer(()=>{
  const {AuthStore} = useStores()
  return (
    <div>
      <p>login:{AuthStore.values.username}</p>
    </div>
  )
})


export default Login
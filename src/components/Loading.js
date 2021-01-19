import React from 'react'
import { Spin } from 'antd';
import styled from 'styled-components';

const SpinWrapper = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

function Loading() {
  return (
    <SpinWrapper tip="Loading..."/>
  )
}

export {Loading}
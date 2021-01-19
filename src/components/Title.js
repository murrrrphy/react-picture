import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 40px;
  font-weight: normal;
  border-bottom: 1px solid #eee;
`

const Component = ({children}) => {
  return (
    <>
      <Title>{children}</Title>
    </>
  )
}

export default Component
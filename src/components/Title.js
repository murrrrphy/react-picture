import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 40px;
  font-weight: 500;
`

const Component = ({children}) => {
  return (
    <>
      <Title>{children}</Title>
      <hr/>
    </>
  )
}

export default Component
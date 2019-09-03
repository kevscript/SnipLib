import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background: darkblue;
  width: 300px;
  padding: 25px;
  color: #f4f4f4;
`

const Header = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h3`
  font-size: 16px;
`

const Button = styled.button`
  background: transparent;
  outline: none;
  border: 2px solid whitesmoke;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  color: inherit;
  cursor: pointer;

  &:hover {
    color: #fff;
    border: 2px solid #fff;
  }
`


const ListBar = () => {
  return (
    <Container>
      <Header>
      <Title>My Lists</Title>
      <Button>+</Button>
      </Header>
    </Container>
  )
}

export default ListBar


// button on click opens a modal or an input
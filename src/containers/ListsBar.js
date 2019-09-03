import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { openListModal } from '../actions'

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
  font-weight: 500;
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

const ListBar = ({ openListModal }) => {
  return (
    <Container>
      <Header>
      <Title>My Lists</Title>
      <Button onClick={openListModal}>+</Button>
      </Header>
    </Container>
  )
}

const mapDispatchToProps = {
  openListModal
}

export default connect(null, mapDispatchToProps)(ListBar)
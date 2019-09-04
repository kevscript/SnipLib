import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { openListModal, setSelectedList } from '../actions'

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background: darkblue;
  width: 300px;
  padding: 25px 0 25px 25px;
  color: #f4f4f4;
`

const Header = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const Button = styled.button`
  background: transparent;
  outline: none;
  border: 2px solid #e3e3e3;
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

const ListsContainer = styled.div``

const Lists = styled.ul`
`

const Item = styled.li`
  cursor: pointer;
  background: ${props => props.selected ? 'red' : 'transparent'};
  border-radius: 3px 0 0 3px;
  padding: 6px 0px 6px 25px;
  margin: 2px 0;

`

const ListBar = ({ lists, openListModal, setSelectedList }) => {
  const { allLists } = lists

  return (
    <Container>
      <Header>
        <Title>My Lists</Title>
        <Button onClick={openListModal}>+</Button>
      </Header>
      <ListsContainer>
        <Lists>
          {allLists.length > 0 && allLists.map(el => {
            return (
              <Item key={el.createdAt} selected={el.selected} id={el.createdAt} onClick={() => setSelectedList(el.createdAt)}>
                {el.name}
              </Item>
            )
          })}
        </Lists>
      </ListsContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  lists: state.lists
})


const mapDispatchToProps = {
  openListModal,
  setSelectedList
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBar)
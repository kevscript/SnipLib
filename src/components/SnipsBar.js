import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import EditIcon from '../assets/edit2.svg'
import DeleteIcon from '../assets/delete2.svg'

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background: whitesmoke;
  width: 300px;
  border-right: 1px solid rgba(0,0,0,0.2);
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  padding: 25px;
`

const ActionsContainer = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-right: 10px;
  }
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const Icon = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const SnipsContainer = styled.div``


const SnipsBar = ({ lists }) => {
  const { allLists } = lists
  const selectedList = allLists.find(x => x.selected === true)

  return (
    <Container>
      <Header>
        <Title>{selectedList.name}</Title>
        <ActionsContainer>
          <IconContainer>
            <Icon  src={EditIcon} data-tip="Edit List" />
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
          </IconContainer>
          <IconContainer>
            <Icon  src={DeleteIcon} data-tip="Delete List" />
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
          </IconContainer>
        </ActionsContainer>
      </Header>
      <SnipsContainer>

      </SnipsContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, null)(SnipsBar)
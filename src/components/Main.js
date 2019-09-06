import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import EditIcon from '../assets/editDark.svg'
import DeleteIcon from '../assets/deleteDark.svg'

const Container = styled.div`
  flex-grow: 1;
  min-height: 100vh;
`

const Header = styled.div`
  margin: 0 25px;
  position: relative;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`

const ActionsContainer = styled.div`
  display: flex;
  position: relative;
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
    margin-right: 15px;
  }
`

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
`

const Icon = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const Editor = styled.div``

const Main = () => {
  return (
    <Container>
      <Header>
        <Title>Im title</Title>
        <ActionsContainer>
          <IconContainer>
            <Icon  src={EditIcon} data-tip=" Edit Snippet" />
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
          </IconContainer>
          <IconContainer>
            <Icon src={DeleteIcon} data-tip="Delete Snippet"/>
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
          </IconContainer>
        </ActionsContainer>
      </Header>
      <div>
        <div>
          <h5>Syntax:</h5>
          <p>Javascript</p>
        </div>
        <Editor>

        </Editor>
      </div>
    </Container>
  )
}

export default Main
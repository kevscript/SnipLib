import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'

import { deleteSnippet, setEditMode } from '../actions'

import EditIcon from '../assets/editDark.svg'
import DeleteIcon from '../assets/deleteDark.svg'
import Editor from './Editor'

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

const TooltipText = styled.span`
  color: ${props => props.dark ? '#333' : 'inherit'};
`

const SubHeader = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 0 25px;
  align-items: center;
  padding: 15px 0;
`

const SubTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  margin-left: 15px;
`

const EditorContainer = styled.div`
  margin: 25px;
`

const MainRead = ({ data, deleteSnippet, setEditMode }) => {
  const { name, language, code } = data

  const options = {
    theme: 'material',
    lineNumbers: true,
    readOnly: true
  }

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
        <ActionsContainer>
          <IconContainer onClick={setEditMode}>
            <Icon src={EditIcon} data-tip data-for="editSnippet" />
            <ReactTooltip id='editSnippet' type='dark' place='bottom'>
              <TooltipText>Edit Snippet</TooltipText>
            </ReactTooltip>
          </IconContainer>
          <IconContainer onClick={deleteSnippet}>
            <Icon src={DeleteIcon} data-tip data-for="deleteSnippet" />
            <ReactTooltip id='deleteSnippet' type='warning'>
              <TooltipText dark>Delete Snippet</TooltipText>
            </ReactTooltip>
          </IconContainer>
        </ActionsContainer>
      </Header>
      <div>
        <SubHeader>
          <p>Language: </p>
          <SubTitle>{language}</SubTitle>
        </SubHeader>
        <EditorContainer>
          <Editor value={code} options={options} lang={language} />
        </EditorContainer>
      </div>
    </Container>
  )
}

const mapDispatchToProps = {
  deleteSnippet,
  setEditMode
}

export default connect(null, mapDispatchToProps)(MainRead)
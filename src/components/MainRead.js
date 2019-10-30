import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Editor from './Editor'
import Icon from './Icon'
import EditIcon from '../assets/editDark.svg'
import DeleteIcon from '../assets/deleteDark.svg'

import { setEditMode, openConfirmDeleteSnippetModal } from '../actions'

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

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin: 0 15px 0 0;
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

const MainRead = ({ selectedSnippet, openConfirmDeleteSnippetModal, setEditMode }) => {
  
  const { name, language, code } = selectedSnippet
  const options = { theme: 'material', lineNumbers: true, readOnly: true }

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
        <ActionsContainer>
          <Icon
            handleOnClick={setEditMode}
            icon={EditIcon}
            tip={true}
            tipName="Edit Snippet"
          />
          <Icon
            handleOnClick={openConfirmDeleteSnippetModal}
            icon={DeleteIcon}
            tip={true}
            tipName="Delete Snippet"
            tipType="warning"
            tipTextColor="dark"
          />
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
  openConfirmDeleteSnippetModal,
  setEditMode
}

export default connect(null, mapDispatchToProps)(MainRead)
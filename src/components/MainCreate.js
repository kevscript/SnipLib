import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  changeSnippetName,
  changeSnippetCode,
  changeSnippetList,
  addNewSnippet,
  setViewMode,
  resetSnippetInputs
} from '../actions'

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

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
`

const TitleError = styled(Title)`
  color: darkred;
`

const SubHeader = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 0 25px;
  align-items: center;
  padding: 15px 0;
  justify-content: space-between;
`

const Input = styled.input`
  flex-grow: 1;
  margin-left: 20px;
  padding: 10px;
`

const Select = styled.select`
  min-width: 150px;
  padding: 10px;
`

const Button = styled.button`
  &:not(:last-child) {
    margin-right: 20px;
  }
`

const EditorContainer = styled.div`
  margin: 25px;
`

const MainCreate = ({ snippets, lists, changeSnippetCode, changeSnippetName, changeSnippetList, addNewSnippet, resetSnippetInputs, setViewMode }) => {

  const { allLists } = lists
  const { codeInput, syntaxInput, nameInput, parentId, error } = snippets

  const handleAdd = () => {
    addNewSnippet()
    /*setViewMode('')
    resetSnippetInputs()*/
  }

  const handleCancel = () => {
    setViewMode('')
    resetSnippetInputs()
  }

  const handleListSelect = (e) => {
    const value = e.target.value
    changeSnippetList(value)
  }

  return (
    <Container>
      <Header>
        { error 
          ? <TitleError>{error}</TitleError>
          : <Title>New Snippet</Title>
        }
        <ActionsContainer>
          <Button onClick={handleCancel}>cancel</Button>
          <Button onClick={handleAdd}>save</Button>
        </ActionsContainer>
      </Header>
      <div>

        <SubHeader>

          {
            allLists &&
            <Select onChange={handleListSelect}>
              <option value="">Select list</option>
              {allLists.map(x => <option key={x.createdAt} value={x.createdAt}>{x.name}</option>)}
            </Select>
          }

          <Input type="text" onChange={e => changeSnippetName(e.target.value)} placeholder="Enter a title for this snippet" value={nameInput} />

        </SubHeader>

        <EditorContainer>
          <Editor handleChange={changeSnippetCode} value={codeInput} />
        </EditorContainer>

      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  snippets: state.snippets,
  lists: state.lists
})

const mapDispatchToProps = {
  changeSnippetName,
  changeSnippetCode,
  changeSnippetList,
  addNewSnippet,
  setViewMode,
  resetSnippetInputs
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCreate)
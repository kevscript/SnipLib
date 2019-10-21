import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  openConfirmDeleteListModal,
  closeConfirmDeleteListModal,
  openConfirmDeleteSnippetModal,
  closeConfirmDeleteSnippetModal,
  deleteList,
  deleteSnippet,
  setSelectedList,
  setSelectedSnippet
} from '../actions'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f4f4;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 25px;
`

const ModalSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

`

const ButtonsContainer = styled.div`
  margin: 10px 0 0;
`

const Button = styled.button`
  cursor: pointer;
  margin-right: 25px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #4E525A;/*Button Color*/
  color: #FFF;
  border: 0;
  border-radius: 3px;
  outline: 0;
  transition: all 0.2s ease-in-out;

  &:not(:last-child) {
    margin-right: 15px;
  }
  
  &:hover {
    transform: translateY(-2px);
    transition: all 0.2s ease-in-out;
  }
`

const ModalText = styled.p`
  text-align: center;
`

const ModalSnippetName = styled.span`
  font-size: inherit;
  font-weight: 500;
  color: #00adb5;
`

const ConfirmModal = ({ type, snippets, lists, closeConfirmDeleteListModal, closeConfirmDeleteSnippetModal, deleteList, deleteSnippet, setSelectedSnippet, setSelectedList }) => {

  const selectedSnippet = snippets.allSnippets.find(x => x.selected === true)
  const selectedList = lists.allLists.find(x => x.selected === true)

  const handleDelete = () => {
    if (type === 'list') {
      deleteList()
      closeConfirmDeleteListModal()
    } else if (type === 'snippet') {
      deleteSnippet()
      closeConfirmDeleteSnippetModal()
    }
  }

  const handleCancel = () => {
    if (type === 'list') {
      closeConfirmDeleteListModal()
    } else if (type === 'snippet') {
      closeConfirmDeleteSnippetModal()
    }
  }

  return (
    <Container>
      <Modal>
        <ModalSection>
          <div>
            {type === 'list'
              ? <ModalText>Are you sure you want to permanently delete <ModalSnippetName>'{selectedList.name}'</ModalSnippetName> list ?</ModalText>
              : <ModalText>Are you sure you want to permanently delete <ModalSnippetName>'{selectedSnippet.name}'</ModalSnippetName> snippet ?</ModalText>
            }
          </div>
          <ButtonsContainer>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </ButtonsContainer>
        </ModalSection>
      </Modal>
    </Container>
  )
}

const mapStateToProps = state => ({
  snippets: state.snippets,
  lists: state.lists
})

const mapDispatchToProps = {
  openConfirmDeleteListModal,
  closeConfirmDeleteListModal,
  openConfirmDeleteSnippetModal,
  closeConfirmDeleteSnippetModal,
  deleteList,
  deleteSnippet,
  setSelectedList,
  setSelectedSnippet
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal)
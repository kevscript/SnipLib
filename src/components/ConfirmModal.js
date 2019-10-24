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
import Button from './Button'

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

const StyledButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 15px;
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
            <StyledButton handleOnClick={handleCancel} label="Cancel" />
            <StyledButton handleOnClick={handleDelete} label="Delete" />
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
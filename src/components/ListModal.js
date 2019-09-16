import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { closeListModal, changeListModalName, addNewList, resetListModalName } from '../actions'

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f4f4;
  width: 600px;
  height: 110px;
  max-width: 90%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 25px;
`

const ModalSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  span {
    color: darkred;
    font-weight: 500;
    font-size: 14px;
  }
`

const ButtonsContainer = styled.div``

const Button = styled.button`
  &:not(:last-child) {
    margin-right: 15px;
  }
`

const Input = styled.input`
  position: relative;
  padding: 10px;
  font-size: 16px;
  border: 1px solid rgba(0,0,0,0.3);
`

const ListModal = ({ lists, closeListModal, changeListModalName, addNewList, resetListModalName }) => {
  const { nameInput, error } = lists

  const handleCancelation = () => {
    resetListModalName()
    closeListModal()
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      addNewList()
    } else if (e.keyCode === 27) {
      handleCancelation()
    }
  }

  return (
    <Modal>
      <ModalSection>
        <Input 
          autoFocus={true}
          onChange={(e) => changeListModalName(e.target.value)} 
          onKeyUp={handleKeyUp}
          value={nameInput}
          type="text" 
          name="list-name" 
          placeholder="Enter a name for your list"
        />
        <ButtonsContainer>
          <Button onClick={addNewList}>Create</Button>
          <Button onClick={handleCancelation}>Cancel</Button>
        </ButtonsContainer>
      </ModalSection>
      { error && 
          <ModalSection>
            <span>{error}</span>
          </ModalSection>
      }
    </Modal>
  )
}

const mapStateToProps = state => ({
  lists: state.lists
})

const mapDispatchToProps = {
  closeListModal,
  changeListModalName,
  addNewList,
  resetListModalName
}

export default connect(mapStateToProps, mapDispatchToProps)(ListModal)
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { closeListModal, changeListModalName, addNewList, resetListModalName } from '../actions'

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
  background: #f4f4f4;
`

const ListModal = ({ lists, closeListModal, changeListModalName, addNewList, resetListModalName }) => {
  const { nameInput } = lists

  const handleCreation = () => {
    addNewList()
    resetListModalName()
    closeListModal()
  }

  const handleCancelation = () => {
    resetListModalName()
    closeListModal()
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleCreation()
    } else if (e.keyCode === 27) {
      handleCancelation()
    }
  }

  return (
    <Container>
      <Modal>
        <label htmlFor="list-name">List Name: </label>
        <input 
          autoFocus={true}
          onChange={(e) => changeListModalName(e.target.value)} 
          onKeyUp={handleKeyUp}
          value={nameInput}
          type="text" 
          name="list-name" 
        />
        <button onClick={handleCreation}>Create</button>
        <button onClick={handleCancelation}>Cancel</button>
      </Modal>
    </Container>
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
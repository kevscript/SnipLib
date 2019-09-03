import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { closeListModal } from '../actions'

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

const ListModal = ({ closeListModal }) => {
  return (
    <Container>
      <Modal>
        <label htmlFor="list-name">List Name: </label>
        <input type="text" name="list-name" />
        <button onClick={() => console.log('list created')}>Create</button>
        <button onClick={closeListModal}>Cancel</button>
      </Modal>
    </Container>
  )
}

const mapDispatchToProps = {
  closeListModal
}

export default connect(null, mapDispatchToProps)(ListModal)
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ListModal from './ListModal'
import ListEdit from './ListEdit'

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

const Modal = ({ lists }) => {
  const { editMode } = lists

  if (editMode) {
    return (
      <Container>
        <ListEdit />
      </Container>
    )
  } else {
    return (
      <Container>
        <ListModal />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, null)(Modal)
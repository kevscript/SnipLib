import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import GlobalStyle from './styles/global'
import ListsBar from './components/ListsBar'
import Modal from './components/Modal'
import SnipsBar from './components/SnipsBar'
import Main from './components/Main'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const App = ({ lists }) => {
  const { modalOpen } = lists

  return (
    <Container>
      <GlobalStyle />
      <ListsBar />
      <SnipsBar />
      <Main />
      {modalOpen && <Modal />}
    </Container>
  );
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, null)(App)

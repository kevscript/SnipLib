import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import GlobalStyle from './styles/global'
import ListsBar from './components/ListsBar'
import ListModal from './components/ListModal'
import SnipsBar from './components/SnipsBar'
import Main from './components/Main'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
`

const App = ({ lists }) => {
  const { modalOpen } = lists
  
  return (
    <Container>
      <GlobalStyle />
      <ListsBar />
      <SnipsBar />
      <Main />
      {modalOpen && <ListModal />}
    </Container>
  );
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, null)(App)

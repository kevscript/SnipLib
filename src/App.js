import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import GlobalStyle from './styles/global'
import Home from './components/Home'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <Home />
    </Container>
  );
}

export default connect()(App)

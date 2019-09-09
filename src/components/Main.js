import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import MainCreate from './MainCreate'
import MainRead from './MainRead'

const Container = styled.div`
  flex-grow: 1;
`

const Main = ({ snippets }) => {
  const { viewMode } = snippets

  if (viewMode === 'create') {
    return (
      <Container>
        <MainCreate />
      </Container>
    )
  }

  if (viewMode === 'read') {
    return (
      <Container>
        <MainRead />
      </Container>
    )
  }

  return (
    <Container>
      <h1>Nothing</h1>
    </Container>
  )
}

const mapStateToProps = state => ({
  snippets: state.snippets
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
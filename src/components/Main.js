import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import MainCreate from './MainCreate'
import MainRead from './MainRead'
import MainEdit from './MainEdit'

const Container = styled.div`
  flex-grow: 1;
`

const Empty = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgrey;
`

const Main = ({ snippets }) => {
  const { viewMode, allSnippets } = snippets
  const selectedSnippet = allSnippets.find(x => x.selected === true)

  if (viewMode === 'create') {
    return (
      <Container>
        <MainCreate />
      </Container>
    )
  }

  if (viewMode === 'read' && !selectedSnippet) {
    return (
      <Container>
        <Empty />
      </Container>
    )
  }
  
  if (viewMode === 'read') {
    return (
      <Container>
        <MainRead data={selectedSnippet} />
      </Container>
    )
  }

  if (viewMode === 'edit') {
    return (
      <Container>
        <MainEdit selectedSnippet={selectedSnippet} />
      </Container>
    )
  }

  return (
    <Container>
      <Empty />
    </Container>
  )
}

const mapStateToProps = state => ({
  snippets: state.snippets
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
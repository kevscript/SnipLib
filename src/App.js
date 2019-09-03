import React from 'react'
import { connect } from 'react-redux'

import GlobalStyle from './styles/global'
import ListsBar from './components/ListsBar'
import ListModal from './components/ListModal'

const App = ({ lists }) => {
  const { modalOpen } = lists
  
  return (
    <div>
      <GlobalStyle />
      <ListsBar />

      {modalOpen && <ListModal />}
    </div>
  );
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, null)(App)

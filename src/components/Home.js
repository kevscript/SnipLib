import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleUser, getData, pushDataError, initUi } from '../actions'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import { userExistsInDatabase } from '../config/fire'

import ListBar from './ListBar'
import Modal from './Modal'
import SnipsBar from './SnipsBar'
import Main from './Main'
import ConfirmModal from './ConfirmModal'
import Login from './Login'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const Home = ({ lists, user, snippets, handleUser, getData, pushDataError, initUi }) => {
  const { modalOpen } = lists
  const { userInfo } = user

  const authListener = () => {
    firebase.auth().onAuthStateChanged(async user => {
      // storing user in local storage to keep him logged on refresh
      localStorage.setItem('authUser', JSON.stringify(user));
      // storing user in state
      handleUser(user)
      if (user) {
        // check if its a new user or not
        const userExists = await userExistsInDatabase(user.uid)
        // if user exists in the db
        if (userExists) {
          // if user found in db, directly retrieve his data and initialize app state with it
          getData()
        } else {
          // if new user, initial a default data state in the db for him
          firebase.database().ref('users/' + user.uid).set({
            lists: [{ name: 'sandbox', createdAt: Date.now(), selected: true }], 
            snippets: []
          }, (err) => {
            if (err) {
              pushDataError(err)
            } else {
              // now his default data is set, retrieve it to initialize app state
              getData()
            }
          })
        }
      }
    }, () => {
      localStorage.removeItem('authUser');
      handleUser(null)
    })
  }

  useEffect(() => { authListener() }, [])

  if (userInfo) {
    return (
      <Container>
        <ListBar />
        <SnipsBar />
        <Main />
        {modalOpen && <Modal />}
        {lists.confirmModalOpen && <ConfirmModal type="list"/>}
        {snippets.confirmModalOpen && <ConfirmModal type="snippet"/>}
      </Container>
    )
  } else {
    return (
      <Login />
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  user: state.user,
  snippets: state.snippets
})

const mapDispatchToProps = {
  handleUser,
  getData,
  pushDataError,
  initUi
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

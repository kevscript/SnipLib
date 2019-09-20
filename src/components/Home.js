import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleUser } from '../actions'

import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { userExistsInDatabase, addUserToDatabase } from '../config/fire'

import ListsBar from './ListsBar'
import Modal from './Modal'
import SnipsBar from './SnipsBar'
import Main from './Main'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const Home = ({ lists, user, handleUser }) => {
  const { modalOpen } = lists
  const { userInfo } = user

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Github as auth providers.
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  }

  const authListener = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const userExists = await userExistsInDatabase(user.uid)
        if (userExists) {
          console.log('user already exists')
        } else {
          addUserToDatabase(user)
          console.log('added new user')
        }
      }
      handleUser(user)
    })
  }

  useEffect(() => { authListener() }, [])

  if (userInfo) {
    return (
      <Container>
        <ListsBar />
        <SnipsBar />
        <Main />
        {modalOpen && <Modal />}
      </Container>
    )
  } else {
    return (
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  user: state.user
})

const mapDispatchToProps = {
  handleUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

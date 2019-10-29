import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import firebase from 'firebase/app'
import 'firebase/auth'

import Button from './Button'
import Icon from './Icon'
import AddIcon from '../assets/addLight.svg'

import { openListModal, setSelectedList } from '../actions'

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background: #222831;
  width: 300px;
  padding: 25px 0 25px 25px;
  color: #f4f4f4;
`

const TitleBar = styled.div`
  display: flex;
  width: 275px;
  padding-right: 25px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
  margin-top: 50px;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const ListsContainer = styled.div``
const Lists = styled.ul``

const Item = styled.li`
  cursor: pointer;
  background: ${props => props.isSelected ? '#00adb5' : 'transparent'};
  border-radius: 3px 0 0 3px;
  padding: 4px 0px 4px 25px;
  margin: 2px 0;
  font-size: 16px;
`
const PhotoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: auto;
  width: 25px;
  height: 25px;
  background: #f4f4f4;
  border: 1px solid #59ff00;
  margin-right: 5px;
`

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
`

const ProfileName = styled.span`
  font-size: 16px;
  font-weight: 500;
`

export const ListBar = ({ lists, user, openListModal, setSelectedList }) => {
  const { allLists } = lists
  const { userInfo } = user
  const handleLogOut = () => {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('authUser')
        console.log('user logged out')
      })
      .catch(err => console.log(err.message))
  }

  const handleListSelection = (e) => {
    if (e.target.getAttribute('data-selected') === 'false') {
      setSelectedList(parseInt(e.target.getAttribute('data-id')))
    }
  }

  const handleOpenListModal = () => {
    openListModal()
  }

  return (
    <Container>
      <Header>
        <Profile>
          <PhotoContainer>
            <Img src={userInfo.photoURL} alt="profile avatar" data-testid="user-avatar"/>
          </PhotoContainer>
          <ProfileName data-testid="user-name">
            {userInfo.displayName ? userInfo.displayName : 'noname'}
          </ProfileName>
        </Profile>
        <Button handleOnClick={handleLogOut} label="Log out" data-testid="log-button"/>
      </Header>
      <TitleBar>
        <Title>My Lists</Title>
        <Icon handleOnClick={handleOpenListModal} icon={AddIcon} tip={true} tipName="Create List" />
      </TitleBar>
      <ListsContainer>
        <Lists data-testid="lists-container">
          {allLists.length > 0 && allLists.map(el => {
            return (
              <Item 
                key={el.createdAt} 
                isSelected={el.selected} 
                data-selected={el.selected}
                data-id={el.createdAt} 
                onClick={handleListSelection}
              >
                {el.name}
              </Item>
            )
          })}
        </Lists>
      </ListsContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  lists: state.lists,
  user: state.user
})


const mapDispatchToProps = {
  openListModal,
  setSelectedList,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBar)
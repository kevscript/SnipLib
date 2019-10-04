import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import firebase from 'firebase/app'
import 'firebase/auth'

import { openListModal, setSelectedList, pushData } from '../actions'
import ReactTooltip from 'react-tooltip'


import AddIcon from '../assets/addLight.svg'

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

const Lists = styled.ul`
`

const Item = styled.li`
  cursor: pointer;
  background: ${props => props.isSelected ? '#00adb5' : 'transparent'};
  border-radius: 3px 0 0 3px;
  padding: 4px 0px 4px 25px;
  margin: 2px 0;
  font-size: 16px;
`

const IconContainer = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Icon = styled.img`
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

const Button = styled.button`
  cursor: pointer;
  margin-right: 25px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #4E525A;/*Button Color*/
  color: #FFF;
  border: 0;
  border-radius: 3px;
  outline: 0;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    transition: all 0.2s ease-in-out;
  }
`

const ListBar = ({ lists, user, openListModal, setSelectedList, pushData }) => {
  const { allLists } = lists
  const { userInfo } = user
  const handleLogOut = () => {
    pushData()
    firebase.auth().signOut()
    localStorage.removeItem('authUser');
    console.log("log out")
  }

  const handleListSelection = (e) => {
    if (e.target.getAttribute('data-selected') === 'false') {
      setSelectedList(parseInt(e.target.getAttribute('data-id')))
    }
  }

  return (
    <Container>
      <Header>
        <Profile>
          <PhotoContainer>
            <Icon src={userInfo.photoURL} alt="profile avatar"/>
          </PhotoContainer>
          <ProfileName>{userInfo.displayName ? userInfo.displayName : 'noname'}</ProfileName>
        </Profile>
        <Button onClick={handleLogOut}>Log Out</Button>
      </Header>
      <TitleBar>
        <Title>My Lists</Title>
        <IconContainer onClick={openListModal}>
          <Icon src={AddIcon} data-tip="Create List"/>
          <ReactTooltip place="bottom" type="dark" effect="solid"/>
        </IconContainer>
      </TitleBar>
      <ListsContainer>
        <Lists>
          {allLists.length > 0 && allLists.map(el => {
            return (
              <Item key={el.createdAt} isSelected={el.selected} data-selected={el.selected}
              data-id={el.createdAt} onClick={handleListSelection}>
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
  pushData
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBar)
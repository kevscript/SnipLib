import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import AddIcon from '../assets/addDark.svg'
import MoreIcon from '../assets/more.svg'

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background: whitesmoke;
  width: 350px;
  border-right: 1px solid rgba(0,0,0,0.2);
`

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 10px 25px;
`

const ActionsContainer = styled.div`
  display: flex;
  position: relative;
`

const IconContainer = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-right: 15px;
  }
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const Icon = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const SnipsContainer = styled.div``


const Menu = styled.ul`
  position: absolute;
  right: -30px;
  top: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  z-index: 999;
  background: #fff;
`

const MenuItem = styled.li`
  padding: 5px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #f4f4f4;
  }
`

const SnipsBar = ({ lists }) => {

  const [openOptions, setOpenOptions] = useState(false)
  const { allLists } = lists
  const selectedList = allLists.find(x => x.selected === true)

  return (
    <Container>
      <Header>
        <Title>{selectedList.name}</Title>
        <ActionsContainer>
          <IconContainer>
            <Icon  src={AddIcon} data-tip="Create Snippet" />
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
          </IconContainer>
          <IconContainer onClick={() => setOpenOptions(!openOptions)}>
            <Icon src={MoreIcon} data-tip="More Options"/>
            <ReactTooltip place="bottom" type="dark" effect="solid"/>
          </IconContainer>
        </ActionsContainer>
        {openOptions && 
          <Menu>
            <MenuItem>Edit List</MenuItem>
            <MenuItem>Delete List</MenuItem>
          </Menu>}
      </Header>
      <SnipsContainer>

      </SnipsContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, null)(SnipsBar)
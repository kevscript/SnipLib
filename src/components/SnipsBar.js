import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import { 
  setViewMode
} from '../actions'

import AddIcon from '../assets/addDark.svg'
import DeleteIcon from '../assets/deleteDark.svg'
import EditIcon from '../assets/editDark.svg'

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

const SnipsContainer = styled.ul``

const TooltipText = styled.span`
  color: ${props => props.dark ? '#333' : 'inherit'};
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 12px;
    color: #333;
    font-style: italic;
  }
`

const SnipItem = styled.li`
  width: 100%;
  height: 40px;
  background: red;
  display: flex;
  align-items: center;
  padding-left: 25px;
`

const SnipsBar = ({ lists, snippets,  setViewMode }) => {

  const { allLists } = lists
  const selectedList = allLists.find(x => x.selected === true)
  const { viewMode, allSnippets } = snippets

  const selectedSnippets = allSnippets.filter(x => x.parentId === selectedList.createdAt)

  const handleAddClick = () => {
    if(viewMode !== 'create') {
      setViewMode('create')
    }
  }

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>{selectedList.name}</Title>
          <span>{selectedSnippets.length} snippets</span>
        </TitleContainer>
        <ActionsContainer>
          <IconContainer onClick={handleAddClick}>
            <Icon src={AddIcon} data-tip data-for="addSnippet" />
            <ReactTooltip id='addSnippet' type='dark' place='bottom'>
              <TooltipText>Add Snippet</TooltipText>
            </ReactTooltip>
          </IconContainer>
          <IconContainer>
            <Icon src={EditIcon} data-tip data-for="editList" />
            <ReactTooltip id='editList' type='dark' place='bottom'>
              <TooltipText>Edit List</TooltipText>
            </ReactTooltip>
          </IconContainer>
          <IconContainer>
            <Icon src={DeleteIcon} data-tip data-for="deleteList" />
            <ReactTooltip id='deleteList' type='warning' place='bottom'>
              <TooltipText dark>Delete List</TooltipText>
            </ReactTooltip>
          </IconContainer>
        </ActionsContainer>
      </Header>
      <SnipsContainer>
        {
          selectedSnippets.length > 0 &&
            selectedSnippets.map(x => {
              return (
                <SnipItem key={x.createdAt}>{x.name}</SnipItem>
              )
            })
        }
      </SnipsContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  lists: state.lists,
  snippets: state.snippets
})

const mapDispatchToProps = {
  setViewMode
}

export default connect(mapStateToProps, mapDispatchToProps)(SnipsBar)
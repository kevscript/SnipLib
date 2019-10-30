import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ListBar } from '../components/ListBar'

describe('ListsBar component', () => {

  let component

  let lists = {
    allLists: [
      { name: 'list 1', selected: false, createdAt: 1 },
      { name: 'list 2', selected: false, createdAt: 2 },
      { name: 'list 3', selected: false, createdAt: 3 }
    ]
  }

  let user = {
    userInfo: {
      photoURL: `${window.location.href}/src/assets/avatar.jpg`,
      displayName: 'Joe'
    }
  }

  const mockOpenModal = jest.fn()
  const mockSetSelected = jest.fn()

  beforeEach(() => {
    component = render(<ListBar lists={lists} user={user} openListModal={mockOpenModal} setSelectedList={mockSetSelected} />)
  })

  it('should render an item with correct text content for each list', () => {
    const { getByTestId } = component

    expect(getByTestId('lists-container').childElementCount).toBe(lists.allLists.length)
    expect(getByTestId('lists-container').firstChild).toHaveTextContent('list 1')
  })

  it('should call the correct functions on each clicks', () => {
    const { getByTestId } = component

    fireEvent.click(getByTestId('lists-container').firstChild)
    expect(mockSetSelected).toHaveBeenCalledTimes(1)

    fireEvent.click(getByTestId('icon-container'))
    expect(mockOpenModal).toHaveBeenCalledTimes(1)
  })

  it('should render user informations', () => {
    const { getByTestId } = component

    expect(getByTestId('user-avatar')).toHaveProperty('src', user.userInfo.photoURL)
    expect(getByTestId('user-name')).toHaveTextContent(user.userInfo.displayName)
  })
  
})
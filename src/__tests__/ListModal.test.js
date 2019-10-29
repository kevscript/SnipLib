import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ListModal } from '../components/ListModal'

describe('ListModal component', () => {

  describe('when no error', () => {

    let component

    let lists = {
      nameInput: 'Javascript',
      error: ''
    }

    const mockClose = jest.fn()
    const mockAdd = jest.fn()
    const mockChange = jest.fn()
    const mockReset = jest.fn()

    beforeEach(() => {
      component = render(<ListModal lists={lists} closeListModal={mockClose} changeListModalName={mockChange} addNewList={mockAdd} resetListModalName={mockReset} />)

    })

    it('should render the correct input', () => {
      const { getByTestId } = component

      expect(getByTestId('list-modal-input').value).toEqual('Javascript')
    })

    it('should trigger change handler with the correct argument', () => {
      const { getByTestId } = component

      fireEvent.change(getByTestId('list-modal-input'), { target: { value: 'Something' } })
      expect(mockChange).toHaveBeenCalledWith('Something')
    })

    it('should trigger the correct actions on different clicks', () => {
      const { getAllByRole } = component

      fireEvent.click(getAllByRole('button')[0])
      expect(mockAdd).toHaveBeenCalledTimes(1)

      fireEvent.click(getAllByRole('button')[1])
      expect(mockClose).toHaveBeenCalledTimes(1)
      expect(mockReset).toHaveBeenCalledTimes(1)
    })

    it('should trigger the correct actions on keys usage', () => {
      const { getByTestId } = component

      fireEvent.keyUp(getByTestId('list-modal-input'), { key: 'Enter', code: 13 })
      expect(mockAdd).toHaveBeenCalledTimes(1)

      fireEvent.keyUp(getByTestId('list-modal-input'), { key: 'Escape', code: 27 })
      expect(mockClose).toHaveBeenCalledTimes(1)
      expect(mockReset).toHaveBeenCalledTimes(1)
    })

    it('shouldnt render an error message', () => {
      const { queryByTestId } = component
      expect(queryByTestId('list-modal-error')).not.toBeInTheDocument()
    })

  })

  describe('when error', () => {

    let component

    let lists = {
      nameInput: '',
      error: 'input is empty'
    }

    const mockClose = jest.fn()
    const mockAdd = jest.fn()
    const mockChange = jest.fn()
    const mockReset = jest.fn()

    beforeEach(() => {
      component = render(<ListModal lists={lists} closeListModal={mockClose} changeListModalName={mockChange} addNewList={mockAdd} resetListModalName={mockReset} />)

    })

    it('should show an error message', () => {
      const { queryByTestId } = component
      expect(queryByTestId('list-modal-error')).toBeInTheDocument()
    })

  })

})
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Icon from '../components/Icon'

describe('Icon component', () => {

  it('renders correctly with the required props', () => {
    const onClick = jest.fn()
    const path = `${window.location.href}/assets/img.jpg`
    const { getByTestId } = render(<Icon handleOnClick={onClick} icon={path} />)

    fireEvent.click(getByTestId('container'))

    expect(onClick).toHaveBeenCalled()
    expect(getByTestId('container')).toContainElement(getByTestId('img'))
    expect(getByTestId('img')).toHaveProperty('src', path)
  })

})
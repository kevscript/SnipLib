import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Icon from '../components/Icon'

describe('Icon component', () => {

  it('renders correctly with only the required props', () => {
    const onClick = jest.fn()
    const path = `${window.location.href}/assets/img.jpg`
    const { getByTestId } = render(<Icon handleOnClick={onClick} icon={path} />)

    fireEvent.click(getByTestId('container'))

    const tooltip = document.querySelector('[data-id="tooltip"]')

    expect(onClick).toHaveBeenCalled()
    expect(getByTestId('container')).toContainElement(getByTestId('img'))
    expect(getByTestId('img')).toHaveProperty('src', path)
    expect(tooltip).not.toBeInTheDocument()
  })


  it("renders correctly with tooltip", () => {
    const myProps = {
      handleOnClick: jest.fn(),
      icon: `${window.location.href}/src/assets/img.jpg`,
      tip: true,
      tipName: 'Name',
      tipPlace: 'bottom',
      tipType: 'dark',
      tipEffect: 'float',
      tipTextColor: 'dark'
    }

    const { container, getByTestId } = render(<Icon {...myProps} />)

    const tooltip = document.querySelector('[data-id="tooltip"]')

    expect(container.firstChild).toContainElement(tooltip)
    expect(tooltip).toHaveClass(`place-${myProps.tipPlace}`)
    expect(tooltip).toHaveClass(`type-${myProps.tipType}`)
    expect(tooltip).toHaveProperty('id', myProps.tipName)
    expect(getByTestId('text')).toHaveStyle('color: #333')
  })
})
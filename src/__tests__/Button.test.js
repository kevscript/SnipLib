import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Button from '../components/Button'

describe('Button component', () => {

  it('renders with correct text and handles correct action', () => {
    const label = 'Hello'
    const onClick = jest.fn()
    const { getByRole } = render(<Button label={label} handleOnClick={onClick} />)
  
    fireEvent.click(getByRole('button'))
  
    expect(onClick).toHaveBeenCalled()
    expect(getByRole('button')).toHaveTextContent(label)
  })

})

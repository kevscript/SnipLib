import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Button from '../components/Button'

test('renders', () => {
  const label = 'Hello'
  const component = render(<Button label={label} />)

  console.log(component)
})
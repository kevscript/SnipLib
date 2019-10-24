import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TheButton = styled.button`
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

const Button = ({label, handleOnClick}) => {
  return (
    <TheButton onClick={handleOnClick}>
      {label}
    </TheButton>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func
}

export default Button
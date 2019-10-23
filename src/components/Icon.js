import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

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

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const TooltipText = styled.span`
  color: ${props => props.color === 'dark' ? '#333' : 'inherit'};
`

const Icon = ({
  handleOnClick, 
  icon, 
  tip = false,
  tipName = 'Name', 
  tipPlace = 'bottom', 
  tipType = 'dark', 
  tipEffect = 'float', 
  tipTextColor = "normal"
}) => {
  return (
    <IconContainer onClick={handleOnClick}>
      <Img src={icon} data-tip data-for={tip ? tipName : ''} />
      { tip ? (
        <ReactTooltip id={tipName} type={tipType} place={tipPlace} effect={tipEffect}>
          <TooltipText color={tipTextColor}>{tipName}</TooltipText>
        </ReactTooltip>
      ) : null }
    </IconContainer>
  )
}

Icon.propTypes = {
  handleOnClick: PropTypes.func.isRequired, 
  icon: PropTypes.string.isRequired, 
  tip: PropTypes.bool,
  tipName: PropTypes.string, 
  tipPlace: PropTypes.string, 
  tipType: PropTypes.string, 
  tipEffect: PropTypes.string,
  tipTheme: PropTypes.string
}

export default Icon
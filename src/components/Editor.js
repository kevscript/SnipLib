import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/css/css');
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')
require('codemirror/mode/php/php')
require('codemirror/mode/python/python')
require('codemirror/mode/ruby/ruby')
require('codemirror/mode/clike/clike')

const Container = styled.div`
  position: relative;
`

const Button = styled.button`
  position: absolute;
  top: 5px;
  right: 25px;
  z-index: 999;
  cursor: pointer;
  outline: 0;
  border: 0;
  background: #00adb5;
  padding: 3px 5px;
  color: #fff;
  font-weight: 600;
  
  &:active {
    background: #f4f4f4;
    color: #00adb5;
  }
`

const StyledMirror = styled(CodeMirror)`
  width: 100%;
`

const Editor = ({ handleChange, value = 'write code here', options, lang, snippets }) => {

  const { viewMode } = snippets

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <Container>
      <StyledMirror
        value={value}
        options={{ ...options, mode: lang }}
        onBeforeChange={(editor, data, val) => {
          handleChange(val)
        }}
      />
      { viewMode === 'read' && <Button onClick={handleCopy}>copy</Button> }
    </Container>
  )
}

const mapStateToProps = state => ({
  snippets: state.snippets
})

export default connect(mapStateToProps, null)(Editor)
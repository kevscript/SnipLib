import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/nord.css';
import 'codemirror/theme/xq-light.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/css/css');
require('codemirror/mode/javascript/javascript')

const Editor = ({ handleChange, value = 'write code here', options}) => {


  return (
    <CodeMirror
      value={value}
      options={options}
      onBeforeChange={(editor, data, val) => {
        handleChange(val)
      }}
    />
  )
}

export default Editor
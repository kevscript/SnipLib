import React from 'react'
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


const Editor = ({ handleChange, value = 'write code here', options, lang }) => {
  return (
    <CodeMirror
      value={value}
      options={{ ...options, mode: lang }}
      onBeforeChange={(editor, data, val) => {
        handleChange(val)
      }}
    />
  )
}

export default Editor
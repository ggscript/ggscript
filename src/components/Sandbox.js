'use strict';

import React from 'react';
import Codemirror from 'react-codemirror';

require('../../node_modules/codemirror/mode/javascript/javascript.js');
require('../../node_modules/codemirror/theme/pastel-on-dark.css');
require('../../node_modules/codemirror/addon/edit/matchbrackets.js');
require('../../node_modules/codemirror/addon/edit/closebrackets.js');
require('../../node_modules/codemirror/addon/hint/javascript-hint.js');
require('../../node_modules/codemirror/addon/hint/show-hint.js');
require('../../node_modules/codemirror/lib/codemirror.css');

const Sandbox = React.createClass({
  getInitialState: function() {
    return {
      code: "// Start coding here!"
    };
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode
    });
  },
  render: function() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      lineWrapping: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      theme: 'pastel-on-dark',
      autoSave: true,
    };
    return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
  }
});

export default Sandbox;

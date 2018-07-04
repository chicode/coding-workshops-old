import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
import * as monaco from 'monaco-editor'

// monaco.editor.defineTheme('default', {
//   base: 'vs-dark',
//   inherit: true,
//   rules: [{ background: '464653' }],
//   colors: {
//     // foreground: '#FFFFFF',
//     // 'editor.foreground': '#FFFFFF',
//     'editor.background': '#464653',
//     // 'editorCursor.foreground': '#FFFFFF',
//     // 'editor.lineHighlightBackground': '#0000FF20',
//     // 'editorLineNumber.foreground': '#008800',
//     // 'editor.selectionBackground': '#88000030',
//     // 'editor.inactiveSelectionBackground': '#88000015',
//   },
// })
monaco.editor.setTheme('vs-dark')

export default class Code extends React.Component {
  decorations = []
  state = {
    error: null,
    displayError: false,
  }
  onChange = (newCode, event) => {
    if (this.props.error) {
      this.decorations = this.editor.deltaDecorations(this.decorations, [])
    }
  }
  componentDidUpdate() {
    if (this.props.error && this.props.error !== this.error) {
      const { error } = this.props
      this.error = error
      this.decorations = this.editor.deltaDecorations(this.decorations, [
        {
          range: new monaco.Range(
            error.location.first_line + 1,
            error.location.first_column + 1,
            error.location.last_line + 1,
            error.location.last_column + 2,
          ),
          options: { inlineClassName: 'error' },
        },
      ])
    }
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <MonacoEditor
          width="100%"
          height="100%"
          language="coffeescript"
          value={this.props.code}
          options={{
            selectOnLineNumbers: true,
            fontSize: 50,
          }}
          onChange={this.onChange}
          editorDidMount={(editor) => (this.editor = editor)}
        />
        {this.props.error && <p>{this.props.error.message}</p>}
      </div>
    )
  }
  componentDidMount() {
    window.addEventListener('resize', () => this.editor.layout())
  }
}

Code.propTypes = {
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  error: PropTypes.object,
}

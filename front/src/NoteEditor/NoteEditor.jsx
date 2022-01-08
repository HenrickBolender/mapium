import React, { Component } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./NoteEditor.css"
import {TextField} from "@material-ui/core"

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editorBackground">
      <div className={"editorBody"}>
              
        <button className={"editorCloseButton"} onClick={this.props.onClose}>X</button>
        <TextField
        className={"editorHeader"}
          placeholder="Заголовок"
          multiline
          variant="standard"
          style={{width: "80%"}}
          inputProps={{style: {fontSize: 50, paddingTop: "50px", lineHeight: "50px"   }}} 
            fullWidth
        />
        <MDEditor   
          commands={[   ]}
          extraCommands={[]}
          textareaProps={{
            placeholder: 'Please enter Markdown text',
          }}
          value={this.props.text}
          onChange={(value) => this.props.onTextChange(value)}
        />
      </div>
      </div>
    );
  }
}

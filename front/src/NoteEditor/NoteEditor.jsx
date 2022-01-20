import React, { Component } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./NoteEditor.css";
import { TextField } from "@material-ui/core";
import {
  AccountCircle,
  Close
} from "@mui/icons-material";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { deleteNote} from "../api"

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editorBackground">
        <Dialog disableEscapeKeyDown open={true} maxWidth="lg" fullWidth>
          <DialogContent>
            <Button
              startIcon={<Close className="quitIcon"></Close>}  
              className={"editorCloseButton"}
              onClick={this.props.onClose}
            >
            </Button>
            <TextField
              className={"editorHeader"}
              placeholder="Заголовок"
              multiline
              value={this.props.header}
              onChange={(e) => this.props.onHeaderChange(e.target.value)}
              variant="standard"
              style={{ width: "50%" }}
              inputProps={{
                style: { fontSize: 50, paddingTop: "50px", lineHeight: "50px" },
              }}
              fullWidth
            />
            <br />
            <br />
            <MDEditor
              commands={[]}
              extraCommands={[]}
              textareaProps={{
                placeholder: "Please enter Markdown text",
              }}
              value={this.props.text}
              onChange={(value) => this.props.onTextChange(value)}
            />

            <DialogActions >
              <Button
                onClick={() => 
                  this.props.deleteNote(this.props.id)}
              >
                Удалить
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

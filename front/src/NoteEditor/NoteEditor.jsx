import React, { Component } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./NoteEditor.css";
import { TextField } from "@material-ui/core";
import {
  AccountCircle,
  Logout,
  Map,
  AddBox,
  ArrowForwardIos,
} from "@mui/icons-material";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editorBackground">
        <Dialog disableEscapeKeyDown open={true} maxWidth="lg" fullWidth>
          <DialogContent>
            <button
              className={"editorCloseButton"}
              onClick={this.props.onClose}
            >
              X
            </button>
            <TextField
              className={"editorHeader"}
              placeholder="Заголовок"
              multiline
              value={this.props.header}
              onChange={(e) => this.props.onHeaderChange(e.target.value)}
              variant="standard"
              style={{ width: "80%" }}
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
                color="secondary"
                onClick={() => {
                  this.setState({ isDialogOpened: false });
                }}
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

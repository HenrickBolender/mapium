import Graph from "react-graph-vis";
import React, { Component } from "react";
import "./NoteGraph.css";
import { AddCircle, Cancel } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

const options = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    shape: "box",
    scaling: {
      label: {
        min: 8,
        max: 20,
      },
    },
  },
  edges: {
    color: "#000000",
  },
};

const createModeOptions = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    shape: "box",
    scaling: {
      label: {
        min: 8,
        max: 20,
      },
    },
  },
  edges: {
    color: "#000000",
  },
  nodes: {
    color: "#fff982",
  },
};

export default class NoteGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: undefined,
      isCreateDialogOpened: false,
      isCreateModeEnabled: false,
    };
  }

  render() {
    const events = {
      selectNode: ({ nodes }) => {
        if (this.state.isCreateModeEnabled) {
          this.setState({ isCreateModeEnabled: false });
          this.props.addNode(nodes[0]);
        } else {
          this.props.editNode(nodes[0]);
        }
      },
    };

    return (
      <div
        className={
          this.state.isCreateModeEnabled ? "createNoteGraph" : "noteGraph"
        }
      >
        <Graph
          graph={this.props.graph}
          options={this.state.isCreateModeEnabled ? createModeOptions : options}
          events={events}
          style={{ height: "100vh" }}
        />

        <div className="addNoteButton">
          {!this.state.isCreateModeEnabled ? (
            <IconButton
              color="primary"
              onClick={() => {
                this.setState({ isCreateModeEnabled: true });
              }}
            >
              <AddCircle className="addNoteButtonIcon" />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              onClick={() => {
                this.setState({ isCreateModeEnabled: false });
              }}
            >
              <Cancel className="addNoteButtonIcon" />
            </IconButton>
          )}
        </div>
        {this.renderCreateNoteDialog()}
      </div>
    );
  }

  renderCreateNoteDialog() {
    return (
      <Dialog
        disableEscapeKeyDown
        open={this.state.isCreateDialogOpened}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Создать заметку</DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ isCreateDialogOpened: false });
              }}
            >
              Отменить
            </Button>
            <Button variant="contained">Создать</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

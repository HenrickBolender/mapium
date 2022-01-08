import Graph from "react-graph-vis";
import React, { Component } from "react";
import "./NoteGraph.css"

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



export default class NoteGraph extends Component {
    constructor(props) {
        super(props);
        this.state = { network: undefined };
      }

  render() {    
    const events = {
      selectNode: ({ nodes }) => {
        this.props.onNodeSelect(nodes[0]);
      },
    };

    return (
      <div 
      className="noteGraph"
      >
        <Graph
          graph={this.props.graph}
          options={options}
          events={events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

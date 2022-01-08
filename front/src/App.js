import "./App.css";
import React, { useState } from "react";
import NoteEditor from "./NoteEditor/NoteEditor";
import NoteGraph from "./NoteGraph/NoteGraph";

const notes = [
  {
    id: 0,
    header: "Математика",
    text: "Я очень **люблю** математику!",
    to: [1, 2],
    value: 20,
  },
  {
    id: 1,
    header: "Квадратичные уравнения",
    text: "Я очень **люблю** квадратичные уравнения",
  },
  {
    id: 2,
    header: "Деление столбиком",
    text: "Я люблю делить столбиком!",
    to: [3],
    value: 10,
  },
  {
    id: 3,
    header: "Задачи для деления столбиком",
    text: "Супер задачи",
  },
];

function getNodes(notes) {
  return notes.map((note, i) => {
    return { id: note.id, label: note.header, value:  note.value ?? 5 };
  });
}

function getEdges(notes) {
  const arr = [];

  for (const note of notes) {
    if (note.to) {
      for (const toNodeId of note.to) {
        arr.push({ from: note.id, to: toNodeId });
      }
    }
  }
  return arr;
}


function App() {
  const [selectedNoteId, setSelectedNode] = useState(-1);
  const [state, setState] = useState({
    stateNotes: notes,
    graph: {
      nodes: getNodes(notes),
      edges: getEdges(notes),
    },
  });

  const { graph, stateNotes } = state;

  return (
    <div className="App">
      <NoteGraph graph={graph} onNodeSelect={selectedNodeId => setSelectedNode(selectedNodeId)}/>

      {selectedNoteId != -1 && (
        <NoteEditor
          onClose={() => setSelectedNode(-1)}
          text={stateNotes[selectedNoteId].text}
          onTextChange={value => {
            console.log(value);
            let newNotes = stateNotes;
            newNotes[selectedNoteId].text = value;
            setState({stateNotes: stateNotes, graph: graph});
          }}
          header={stateNotes[selectedNoteId].header}
        />
      )}
    </div>
  );
} 

export default App;

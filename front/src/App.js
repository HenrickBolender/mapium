import "./App.css";
import React, { useState } from "react";
import NoteEditor from "./NoteEditor/NoteEditor";
import NoteGraph from "./NoteGraph/NoteGraph";
import Header from "./Header/Header";
import maps from "./mapsData";

function getNodes(notes) {
  return notes.map((note, i) => {
    return { id: note.id, label: note.header, value: note.value ?? 5 };
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
    stateNotes: maps[0].notes,
    currentMapId: maps[0].id,
    currentMapName: maps[0].name,
    graph: {
      nodes: getNodes(maps[0].notes),
      edges: getEdges(maps[0].notes),
    },
  });

  const { graph, stateNotes, currentMapId, currentMapName } = state;
  console.log(graph);

  const addNote = (selectedNodeId) => {
      const newNotes = stateNotes;

      const newNoteId = newNotes.length;

      newNotes.push({        
        id: newNoteId,
        header: "Без имени",
        text: "Супер задачи",
      })
      if (selectedNodeId !== undefined ) {
        const newTo = newNotes[selectedNodeId].to ?? [];
        newTo.push(newNoteId);
        newNotes[selectedNodeId].to = newTo;
      }

      setState({
        stateNotes: newNotes,
        graph: {
          edges: getEdges(newNotes),
          nodes: getNodes(newNotes)
        },
        currentMapId: currentMapId,
        currentMapName: currentMapName,
      });

  }

  return (
    <div className="App">
      <Header
        userName="HenrickBolender"
        mapName={state.currentMapName}
        currentMapId={state.currentMapId}
        maps={maps}
        onMapPick={(mapId) => {
          setState({
            currentMapId: mapId,
            currentMapName: maps[mapId].name,
            graph: {
              nodes: getNodes(maps[mapId].notes),
              edges: getEdges(maps[mapId].notes),
            },
            stateNotes: maps[mapId].notes,
          });
        }}
      />
      <NoteGraph
        graph={graph}
        addNode={addNote}
        editNode={(selectedNodeId) => setSelectedNode(selectedNodeId)}
      />
      {selectedNoteId !== -1 && (
        <NoteEditor
          onClose={() => setSelectedNode(-1)}
          text={stateNotes[selectedNoteId].text}
          onTextChange={(value) => {
            let newNotes = stateNotes;

            if (!newNotes[selectedNoteId]) {
              return;
            }

            newNotes[selectedNoteId].text = value;
            setState({
              stateNotes: stateNotes,
              graph: graph,
              currentMapId: currentMapId,
              currentMapName: currentMapName,
            });
          }}
          onHeaderChange={(header) => {
            let newNotes = stateNotes;
            newNotes[selectedNoteId].header = header;

            setState({
              stateNotes: stateNotes,
              graph: { edges: getEdges(stateNotes), nodes: getNodes(stateNotes) },
              currentMapId: currentMapId,
              currentMapName: currentMapName,
            });
          }}
          header={stateNotes[selectedNoteId].header}
        />
      )}
    </div>
  );
}

export default App;

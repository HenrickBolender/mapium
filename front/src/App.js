import "./App.css";
import React, { useEffect, useState } from "react";
import NoteEditor from "./NoteEditor/NoteEditor";
import NoteGraph from "./NoteGraph/NoteGraph";
import Header from "./Header/Header";
import maps from "./mapsData";
import { getCurrentUser, getMap, addNote as addNoteFromApi , addEdge  as addEdgeFromApi, deleteNote as apiDeleteNote, apiAddMap} from "./api";

function App() {
  const [selectedNoteId, setSelectedNode] = useState(-1);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(1);

  const [state, setState] = useState({
    isLoading: true,
    stateNotes: [],
    currentMapId: 1,
    currentMapName: "unknown",
    graph: undefined
  });
  
  const { graph, stateNotes, currentMapId, currentMapName, isLoading } = state;

  useEffect(() => {
    loadAppState().then((loadedState) => {
      setUserId(loadedState.user.id);
      setUserName(loadedState.user.name);
      setState({
        isLoading: false,
        currentMapId: loadedState.map.id,
        stateNotes: getNotesDict(loadedState.map.notes),
        currentMapName: loadedState.map.name,
        graph : buildGraph(loadedState.map.edges, loadedState.map.notes),
      });
    });
  }, []);

  const addMap = (mapName) => {
      apiAddMap(userId, mapName).then(async mapId => {
        setState({
          currentMapId: mapId,
          stateNotes: {},
          currentMapName: mapName,
          graph : {nodes: [], edges: []},
        });
      })
  }

  const deleteNote = (noteId) => {
    const newNotes = stateNotes;
    delete newNotes[noteId];

    setSelectedNode(-1);
    setState({
      stateNotes: newNotes,
      graph: buildGraph(graph.edges, Object.values(newNotes)),
      currentMapId: currentMapId,
      currentMapName: currentMapName,
    });

    apiDeleteNote(noteId);
  }

  const addNote = (selectedNodeId) => {
    const newNotes = stateNotes;
    const newNote ={
      header: "Без имени",
      text: "Супер задачи",
    };

    addNoteFromApi(currentMapId, newNote.header, newNote.text).then(async noteId => {
      newNotes[noteId] = {
        id: noteId,
        header: newNote.header,
        text: newNote.text,
      };

      const newEdges = []
      for (const edge of graph.edges)
      {
        newEdges.push({from: edge.from, to: edge.to});
      }

      if (selectedNodeId)
      {
        newEdges.push({from: selectedNodeId, to: noteId});
        await addEdgeFromApi(currentMapId, selectedNodeId, noteId);
      }

      setState({
        stateNotes: newNotes,
        graph: buildGraph(newEdges, Object.values(newNotes)),
        currentMapId: currentMapId,
        currentMapName: currentMapName,
      });
    });
  };

  if (isLoading) {
    return <div>App is loading</div>;
  }

  return (
    <div className="App">
      <Header
        userName={userName}
        userId={userId}
        mapName={state.currentMapName}
        currentMapId={state.currentMapId}
        maps={maps}
        addMap={addMap}
        onMapPick={(mapId) => {
          //TODO брать из back-end'a
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
          deleteNote={deleteNote}
          id={selectedNoteId}
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
              graph: {
                edges: getEdges(stateNotes),
                nodes: getNodes(stateNotes),
              },
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

async function loadAppState() {
  const userData = await getCurrentUser();
  let map = await getMap(userData.currentMapId);
  let result = {
    user: userData.user,
    map,
  };
  console.log(result);
  return result;
}

function buildGraph(edges, notes) {
  const nodes = notes.map((note) => {return { id: note.id, label: note.header};});
   return {
     edges,
     nodes,
   }
}

function getNotesDict(notes) {
   let dictionary = Object.assign({}, ...notes.map((note) => ({[note.id]: {id: note.id, header: note.header, text: note.text}})));
   console.log(dictionary);
   return dictionary;
}
  
export default App;

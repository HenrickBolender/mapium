import "./App.css";
import React, { useEffect, useState } from "react";
import NoteEditor from "./NoteEditor/NoteEditor";
import NoteGraph from "./NoteGraph/NoteGraph";
import Header from "./Header/Header";
import maps from "./mapsData";
import LoginPage from "./LoginPage/LoginPage";

import {
  getCurrentUser,
  getMap,
  addNote as addNoteFromApi,
  addEdge as addEdgeFromApi,
  deleteNote as apiDeleteNote,
  apiAddMap,
  apiEditHeader,
  apiEditText,
  switchUser as apiSwitchUser,
  logoutUser as apiLogoutUser,
} from "./api";

function App() {
  const [selectedNoteId, setSelectedNode] = useState(-1);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(1);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [state, setState] = useState({
    isLoading: true,
    stateNotes: [],
    currentMapId: 1,
    currentMapName: "unknown",
    graph: undefined,
  });

  const { graph, stateNotes, currentMapId, currentMapName, isLoading } = state;

  const loadUserPage = () => {
      
    loadAppState().then((loadedState) => {
      if (!loadedState) {
        console.log("no logged in. going to login page...");
        setLoggedIn(false);
        setState({
          isLoading: false,
        });
        return; 
      }

      console.log("logged in. going to map page...");
      console.log(loadedState)
      setUserId(loadedState.user.id);
      setUserName(loadedState.user.name);
      setState({
        isLoading: false,
        currentMapId: loadedState.map.id,
        stateNotes: getNotesDict(loadedState.map.notes),
        currentMapName: loadedState.map.name,
        graph: buildGraph(loadedState.map.edges, loadedState.map.notes),
      });
      setLoggedIn(true);
    });
  }

  useEffect(loadUserPage, []);

  const addMap = (mapName) => {
    apiAddMap(userId, mapName).then(async (mapId) => {
      setState({
        currentMapId: mapId,
        stateNotes: {},
        currentMapName: mapName,
        graph: { nodes: [], edges: [] },
      });
    });
  };

  const switchMap = (mapId) => {
    getMap(mapId).then(async (map) => {
      setState({
        currentMapId: map.id,
        stateNotes: getNotesDict(map.notes),
        currentMapName: map.name,
        graph: buildGraph(map.edges, map.notes),
      });
    });
  };

  const switchUser = (userName, password) => {
    apiSwitchUser(userName).then(loadUserPage);
  };

  const logout = () => {
    apiLogoutUser().then(loadUserPage);
  };

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
  };

  const addNote = (selectedNodeId) => {
    const newNotes = stateNotes;
    const newNote = {
      header: "Без имени",
      text: "Супер задачи",
    };

    addNoteFromApi(currentMapId, newNote.header, newNote.text).then(
      async (noteId) => {
        newNotes[noteId] = {
          id: noteId,
          header: newNote.header,
          text: newNote.text,
        };

        const newEdges = [];
        for (const edge of graph.edges) {
          newEdges.push({ from: edge.from, to: edge.to });
        }

        if (selectedNodeId) {
          newEdges.push({ from: selectedNodeId, to: noteId });
          await addEdgeFromApi(currentMapId, selectedNodeId, noteId);
        }

        setState({
          stateNotes: newNotes,
          graph: buildGraph(newEdges, Object.values(newNotes)),
          currentMapId: currentMapId,
          currentMapName: currentMapName,
        });
      }
    );
  };

  if (isLoading) {
    return <div>App is loading</div>;
  }

  if (!isLoggedIn) {
    return <LoginPage onCredentialsEnter={switchUser}/>;
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
        onMapPick={switchMap}
        logout={logout}
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

            apiEditText(selectedNoteId, value);
          }}
          onHeaderChange={(header) => {
            const newNotes = stateNotes;
            newNotes[selectedNoteId].header = header;

            setState({
              stateNotes: stateNotes,
              graph: buildGraph(graph.edges, Object.values(newNotes)),
              currentMapId: currentMapId,
              currentMapName: currentMapName,
            });

            apiEditHeader(selectedNoteId, header);
          }}
          header={stateNotes[selectedNoteId].header}
        />
      )}
    </div>
  );
}

async function loadAppState() {
  const userData = await getCurrentUser();
  if (!userData.user) {
    return null;
  }

  let map = await getMap(userData.currentMapId);
  let result = {
    user: userData.user,
    map,
  };
  console.log(result);
  return result;
}

function buildGraph(edges, notes) {
  const nodes = notes.map((note) => {
    return { id: note.id, label: note.header };
  });

  const buildedGraph = {
    edges,
    nodes,
  };

  console.log(buildedGraph);
  return buildedGraph;
}

function getNotesDict(notes) {
  let dictionary = Object.assign(
    {},
    ...notes.map((note) => ({
      [note.id]: { id: note.id, header: note.header, text: note.text },
    }))
  );
  console.log(dictionary);
  return dictionary;
}

export default App;

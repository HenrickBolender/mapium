const HOST_URL = "https://localhost:5001";

export async function getCurrentUser() {
  const response = await fetch(`${HOST_URL}/users/current`);
  return response.json();
}

export async function getMaps(userId) {
  const response = await fetch(`${HOST_URL}/maps?userId=${userId}`);
  return response.json();
}

export async function getMap(mapId) {
  const response = await fetch(`${HOST_URL}/maps/${mapId}`);
  return response.json();
}

export async function apiAddMap(userId, mapName) {
  const response = await fetch(
    `${HOST_URL}/maps?userId=${userId}&mapName=${encodeURIComponent(mapName)}`,
    {
      method: "POST",
    }
  );
  return response.json();
}

export async function addNote(mapId, header, text) {
  const response = await fetch(  
    `${HOST_URL}/notes?mapId=${mapId}&header=${encodeURIComponent(header)}`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    }
  );
  return response.json();
}

export async function deleteNote(noteId) {  
  await fetch(  
    `${HOST_URL}/notes/${noteId}`,
    {
      method: "DELETE",
    }
  );
}

export async function addEdge(mapId, fromId, toId) {
  await fetch(  
    `${HOST_URL}/mapEdges?mapId=${mapId}&fromId=${fromId}&toId=${toId}`,
    {
      method: "POST",
    }
  );
}

export async function apiEditText(noteId, text) {
  await fetch(
    `${HOST_URL}/notes/${noteId}/editText`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    }
  );
}

export async function apiEditHeader(noteId, header) {
  await fetch(  
    `${HOST_URL}/notes/${noteId}/editHeader`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(header)
    }
  );
}

import { authHeader } from "../_helpers";

export const boardService = {
  getBoards,
  getBoard
};

function getBoards() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  
  return fetch('/api/board', requestOptions)
    .then(handleResponse)
    .then(response => {
      return response.boards;
    });
}

function getBoard(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch('/api/board/' + id, requestOptions)
  .then(handleResponse)
  .then(response=> {
    return response.board;
  });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        console.log(response);
      }

      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

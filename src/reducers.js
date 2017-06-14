import { ADD_OMDB_DATA, SET_SEARCH_TERM } from "./actions";

const DEFAULT_STATE = {
  omdbData: {},
  searchTerm: ""
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_OMDB_DATA:
      return addOmdbData(state, action);
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action);
    default:
      return state;
  }
};

function addOmdbData(state, action) {
  const newOmdbData = {};
  Object.assign(newOmdbData, state.omdbData, {
    [action.imdbID]: action.omdbData
  });
  const newState = {};
  Object.assign(newState, state, { omdbData: newOmdbData });
  return newState;
}

function setSearchTerm(state, action) {
  return Object.assign({}, state, { searchTerm: action.searchTerm });
}

export default rootReducer;

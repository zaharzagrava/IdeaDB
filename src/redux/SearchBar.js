
// Action Types
export const SearchBarActionTypes = {
  ELEM_CHANGED: "ELEM_CHANGED",
  ELEM_MOUNTED: "ELEM_MOUNTED",
  ELEM_UNMOUNTED: "ELEM_UNMOUNTED",
}

// Inittial State
const InitialState = {
  byIds: {},
  allIds: []
};

// Reducer
export default function SearchBarReducer(state = InitialState, action) {
  let newState = {};

  switch (action.type) {
    case SearchBarActionTypes.ELEM_CHANGED || SearchBarActionTypes.ELEM_MOUNTED:
      // console.log("INSIDE")

      let allIds = [...state.allIds];
      if(!state.allIds.includes(action.payload.id)){
        allIds.push(action.payload.id)
      }

      newState = {
        byIds: {
          ...state.byIds,
          [action.payload.id]: {
            ...state.byIds[action.payload.id],
            ...action.payload
          }
        },
        allIds: allIds
      }

      return newState;
    case SearchBarActionTypes.ELEM_UNMOUNTED:
      newState = {
        ...state
      }

      delete newState.byIds[action.payload.id];
      const index = newState.allIds.indexOf(action.payload.id);
      if (index > -1) {
        newState.allIds.splice(index, 1);
      }
      
      return newState;
    default:
      return state
  }
}

// Action Creators
export const SearchBarActionCreators = {
  elemChanged: function(uuidv4, searchBarText) {
    return {
      type: SearchBarActionTypes.ELEM_CHANGED,
      payload: {
        id: uuidv4,
        searchBarText: searchBarText
      }
    }
  },
  elemMounted: function(uuidv4) {
    return {
      type: SearchBarActionTypes.ELEM_MOUNTED,
      payload: {
        id: uuidv4
      }
    }
  },
  elemUnmounted: function(uuidv4) {
    return {
      type: SearchBarActionTypes.ELEM_UNMOUNTED,
      payload: {
        id: uuidv4
      }
    }
  }
}
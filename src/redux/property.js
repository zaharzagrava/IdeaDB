// Action Types
export const PropertyActionTypes = {
  PROPERTY_INFO_LOADED: "PROPERTY_INFO_LOADED"
}

// Inittial State
const InitialState = {
  byIds: {},
  allIds: []
};

// Reducer
export default function PropertyReducer(state = InitialState, action) {

  switch (action.type) {
    case PropertyActionTypes.PROPERTY_INFO_LOADED:
      let allIds = [...state.allIds];
      if(!state.allIds.includes(action.payload.id)){
        allIds.push(action.payload.id)
      }

      const newState = {
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
    default:
      return state
  }
}

// Action Creators
export const PropertyActionCreators = {
  propertyInfoLoaded: function(property) {
    return {
      type: PropertyActionTypes.PROPERTY_INFO_LOADED,
      payload: property
    }
  }
}
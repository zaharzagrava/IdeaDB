// Action Types
export const KnowledgeFileActionTypes = {
  KNOWLEDGE_FILE_INFO_LOADED: "KNOWLEDGE_FILE_INFO_LOADED",
  KNOWLEDGE_FILE_INFO_DELETED: "KNOWLEDGE_FILE_INFO_DELETED",
  KNOWLEDGE_FILES_RELOADED: "KNOWLEDGE_FILES_RELOADED"
}

// Inittial State
const InitialState = {
  byIds: {},
  allIds: []
};

// Reducer
export default function KnowledgeFileReducer(state = InitialState, action) {
  let allIds = null;
  let newState = null;

  switch (action.type) {
    case KnowledgeFileActionTypes.KNOWLEDGE_FILE_INFO_LOADED:
      console.log("@KNOWLEDGE_FILE_INFO_LOADED")

      allIds = [...state.allIds];
      if(!state.allIds.includes(action.payload.id)){
        console.log("@newKnowledgeFile")
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
    case KnowledgeFileActionTypes.KNOWLEDGE_FILE_INFO_DELETED:
      console.log("@KNOWLEDGE_FILE_INFO_DELETED")

      newState = {
        byIds: {},
        allIds: []
      }

      for (let i = 0; i < state.allIds.length; i++) {
        const knowledgeFileId = state.allIds[i];
        const knowledgeFile = state.byIds[knowledgeFileId];

        if(knowledgeFileId !== action.payload.id) {
          const newKnowledgeFile = {
            ...knowledgeFile,
            properties: {}
          };

          for(let key in knowledgeFile.properties) {
            const propertyList = knowledgeFile.properties[key];

            newKnowledgeFile.properties[key] = [...propertyList];
          }

          newState.byIds[knowledgeFileId] = newKnowledgeFile;
          newState.allIds.push(knowledgeFileId);
        }
      }
      
      return newState;
    case KnowledgeFileActionTypes.KNOWLEDGE_FILES_RELOADED:
      console.log("@KNOWLEDGE_FILES_RELOADED");
      return InitialState;
    default:
      return state
  }
}

// Action Creators
export const KnowledgeFileActionCreators = {
  knowledgeFileInfoLoaded: function(knowledgeFile) {
    return {
      type: KnowledgeFileActionTypes.KNOWLEDGE_FILE_INFO_LOADED,
      payload: knowledgeFile
    }
  },
  knowledgeFileInfoDeleted: function(knowledgeFile) {
    return {
      type: KnowledgeFileActionTypes.KNOWLEDGE_FILE_INFO_DELETED,
      payload: knowledgeFile
    }
  },
  knowledgeFilesReloaded: function() {
    return {
      type: KnowledgeFileActionTypes.KNOWLEDGE_FILES_RELOADED,
    }
  }
}
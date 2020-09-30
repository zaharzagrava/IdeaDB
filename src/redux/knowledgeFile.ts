import produce from 'immer';
import { KnowledgeFile } from '../types/types';

// Action Types
export const KNOWLEDGE_FILE_INFO_LOADED = 'KNOWLEDGE_FILE_INFO_LOADED';
export const KNOWLEDGE_FILE_INFO_DELETED = 'KNOWLEDGE_FILE_INFO_DELETED';
export const KNOWLEDGE_FILES_RELOADED = 'KNOWLEDGE_FILES_RELOADED';

// Actions Interfaces
interface KnowledgeFileInfoLoaded {
  type: typeof KNOWLEDGE_FILE_INFO_LOADED;
  payload: KnowledgeFile;
}

interface KnowledgeFileInfoDeleted {
  type: typeof KNOWLEDGE_FILE_INFO_DELETED;
  payload: KnowledgeFile;
}

interface KnowledgeFilesReloaded {
  type: typeof KNOWLEDGE_FILES_RELOADED;
}

type KnowledgeFileAction =
  | KnowledgeFileInfoLoaded
  | KnowledgeFileInfoDeleted
  | KnowledgeFilesReloaded;

// State Interfaces
export interface KnowledgeFileState {
  byIds: {
    [key: number]: KnowledgeFile;
  };
  allIds: string[];
}

const initialState: KnowledgeFileState = {
  byIds: {},
  allIds: [],
};

export default produce(
  (draft: KnowledgeFileState, action: KnowledgeFileAction) => {
    switch (action.type) {
      case KNOWLEDGE_FILE_INFO_LOADED:
        // Update / Load KnowledgeFileId
        if (!draft.allIds.includes(action.payload.id.toString())) {
          draft.allIds.push(action.payload.id.toString());
        }

        // Update / Load knowledgeFile
        draft.byIds[action.payload.id] = {
          id: action.payload.id,
          srcText: action.payload.srcText,
          lastDateTimeModified: action.payload.lastDateTimeModified,
          dateTimeCreated: action.payload.dateTimeCreated,
          wordCount: action.payload.wordCount,
        };
        return;

      case KNOWLEDGE_FILE_INFO_DELETED:
        delete draft.byIds[action.payload.id];
        return;
      case KNOWLEDGE_FILES_RELOADED:
        draft = {
          byIds: {},
          allIds: [],
        };
        return;

      default:
        return;
    }
  },
  initialState
);

export const KnowledgeFileActionCreators = {
  knowledgeFileInfoLoaded: function (
    knowledgeFile: KnowledgeFile
  ): KnowledgeFileInfoLoaded {
    return {
      type: KNOWLEDGE_FILE_INFO_LOADED,
      payload: knowledgeFile,
    };
  },
  knowledgeFileInfoDeleted: function (
    knowledgeFile: KnowledgeFile
  ): KnowledgeFileInfoDeleted {
    return {
      type: KNOWLEDGE_FILE_INFO_DELETED,
      payload: knowledgeFile,
    };
  },
  knowledgeFilesReloaded: function (): KnowledgeFilesReloaded {
    return {
      type: KNOWLEDGE_FILES_RELOADED,
    };
  },
};

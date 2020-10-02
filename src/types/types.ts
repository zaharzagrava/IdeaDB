/* Root Reducer Type */
import rootReducer from '../redux/index';

export type StateType = ReturnType<typeof rootReducer>;

/* Server data types */
export interface KnowledgeFile {
  id: number;
  srcText?: string;
  lastDateTimeModified?: string;
  dateTimeCreated?: string;
  wordCount?: string;
}

export interface Client {
  id: number;
  fullName?: string;
}

export type ServerDataType = KnowledgeFile | Client;

export const NKnowledgeFile = 'knowledge_file';
export const NClient = 'client';

export type NamesDataType = typeof NKnowledgeFile | typeof NClient;

export enum KnowledgeFileFields {
  id = 'id',
  srcText = 'srcText',
  lastDateTimeModified = 'lastDateTimeModified',
  dateTimeCreated = 'dateTimeCreated',
  wordCount = 'wordCount',
}

/* GraphQL Queries Types */
export enum QueryType {
  getKnowledgeFile,
  getKnowledgeFiles,
  postKnowledgeFile,
  putKnowledgeFile,
  deleteKnowledgeFile,
}

export enum Direction {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum KnowledgeFileFieldsCAPS {
  LAST_DATE_TIME_MODIFIED = 'LAST_DATE_TIME_MODIFIED',
  DATE_TIME_CREATED = 'DATE_TIME_CREATED',
}

export interface KnowledgeFileOrderSettings {
  orderDirection: Direction;
  orderField: KnowledgeFileFieldsCAPS;
}

export interface GetKnowledgeFileArgs {
  id: number;
  idToken: string;
}

export interface PostKnowledgeFileArgs {
  srcText: string;
  idToken: string;
}

export interface PutKnowledgeFileArgs {
  id: number;
  srcText: string;
  idToken: string;
}

export interface DeleteKnowledgeFileArgs {
  id: number;
  idToken: string;
}

export interface GetKnowledgeFilesArgs {
  regexList: string[];
  knowledgeFileOrderSettings: KnowledgeFileOrderSettings[];
  limit: number;
  offset: number;
  idToken: string;
}

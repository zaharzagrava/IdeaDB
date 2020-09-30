/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export enum KnowledgeFileFields {
  LAST_DATE_TIME_MODIFIED = "LAST_DATE_TIME_MODIFIED",
  DATE_TIME_CREATED = "DATE_TIME_CREATED",
}


export enum Directions {
  DESC = "DESC",
  ASC = "ASC",
}


export type PutKnowledgeFileMutationVariables = {
  id: string,
  srcText?: string | null,
  idToken?: string | null,
};

export type PutKnowledgeFileMutation = {
  putKnowledgeFile:  {
    __typename: "KnowledgeFile",
    id: string,
    srcText: string | null,
    lastDateTimeModified: string | null,
    dateTimeCreated: string | null,
  } | null,
};

export type PostKnowledgeFileMutationVariables = {
  srcText?: string | null,
  idToken?: string | null,
};

export type PostKnowledgeFileMutation = {
  postKnowledgeFile:  {
    __typename: "KnowledgeFile",
    id: string,
    srcText: string | null,
    lastDateTimeModified: string | null,
    dateTimeCreated: string | null,
  } | null,
};

export type DeleteKnowledgeFileMutationVariables = {
  id: string,
  idToken?: string | null,
};

export type DeleteKnowledgeFileMutation = {
  deleteKnowledgeFile:  {
    __typename: "KnowledgeFile",
    id: string,
    srcText: string | null,
    lastDateTimeModified: string | null,
    dateTimeCreated: string | null,
  } | null,
};

export type GetKnowledgeFileQueryVariables = {
  id: string,
  idToken?: string | null,
};

export type GetKnowledgeFileQuery = {
  // Get a single value of type 'Post' by primary key.
  getKnowledgeFile:  {
    __typename: "KnowledgeFile",
    id: string,
    srcText: string | null,
    lastDateTimeModified: string | null,
    dateTimeCreated: string | null,
  } | null,
};

export type GetKnowledgeFilesQueryVariables = {
  regexList: Array< string >,
  orderByFields: Array< KnowledgeFileFields >,
  orderByDirections: Array< Directions >,
  limit?: number | null,
  offset?: number | null,
  idToken?: string | null,
};

export type GetKnowledgeFilesQuery = {
  getKnowledgeFiles:  Array< {
    __typename: "KnowledgeFile",
    id: string,
    srcText: string | null,
    lastDateTimeModified: string | null,
    dateTimeCreated: string | null,
  } | null > | null,
};

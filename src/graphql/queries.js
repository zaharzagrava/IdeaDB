/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getKnowledgeFile = /* GraphQL */ `
  query GetKnowledgeFile($id: ID!, $idToken: String) {
    getKnowledgeFile(id: $id, idToken: $idToken) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;
export const getKnowledgeFiles = /* GraphQL */ `
  query GetKnowledgeFiles(
    $regexList: [String!]!
    $orderByFields: [KnowledgeFileFields!]!
    $orderByDirections: [Directions!]!
    $limit: Int
    $offset: Int
    $idToken: String
  ) {
    getKnowledgeFiles(
      regexList: $regexList
      orderByFields: $orderByFields
      orderByDirections: $orderByDirections
      limit: $limit
      offset: $offset
      idToken: $idToken
    ) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;

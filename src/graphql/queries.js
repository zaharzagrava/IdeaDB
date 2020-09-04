/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getKnowledgeFile = /* GraphQL */ `
  query GetKnowledgeFile($id: ID!) {
    getKnowledgeFile(id: $id) {
      id
      htmlText
      plainText
      properties
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;
export const getKnowledgeFiles = /* GraphQL */ `
  query GetKnowledgeFiles(
    $properties: AWSJSON
    $plainText: String
    $orderByFields: [KnowledgeFileFields!]!
    $orderByDirections: [Directions!]!
    $limit: Int
    $offset: Int
  ) {
    getKnowledgeFiles(
      properties: $properties
      plainText: $plainText
      orderByFields: $orderByFields
      orderByDirections: $orderByDirections
      limit: $limit
      offset: $offset
    ) {
      id
      htmlText
      plainText
      properties
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;

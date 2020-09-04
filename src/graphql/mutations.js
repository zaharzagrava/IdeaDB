/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const putKnowledgeFile = /* GraphQL */ `
  mutation PutKnowledgeFile(
    $id: ID!
    $htmlText: String
    $plainText: String
    $properties: AWSJSON
  ) {
    putKnowledgeFile(
      id: $id
      htmlText: $htmlText
      plainText: $plainText
      properties: $properties
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
export const postKnowledgeFile = /* GraphQL */ `
  mutation PostKnowledgeFile(
    $htmlText: String
    $plainText: String
    $properties: AWSJSON
  ) {
    postKnowledgeFile(
      htmlText: $htmlText
      plainText: $plainText
      properties: $properties
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
export const deleteKnowledgeFile = /* GraphQL */ `
  mutation DeleteKnowledgeFile($id: ID!) {
    deleteKnowledgeFile(id: $id) {
      id
      htmlText
      plainText
      properties
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;

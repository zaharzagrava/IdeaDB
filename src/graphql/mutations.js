/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const putKnowledgeFile = /* GraphQL */ `
  mutation PutKnowledgeFile($id: ID!, $srcText: String) {
    putKnowledgeFile(id: $id, srcText: $srcText) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;
export const postKnowledgeFile = /* GraphQL */ `
  mutation PostKnowledgeFile($srcText: String) {
    postKnowledgeFile(srcText: $srcText) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;
export const deleteKnowledgeFile = /* GraphQL */ `
  mutation DeleteKnowledgeFile($id: ID!) {
    deleteKnowledgeFile(id: $id) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;

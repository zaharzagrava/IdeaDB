/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const putKnowledgeFile = /* GraphQL */ `
  mutation PutKnowledgeFile($id: ID!, $srcText: String, $idToken: String) {
    putKnowledgeFile(id: $id, srcText: $srcText, idToken: $idToken) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;
export const postKnowledgeFile = /* GraphQL */ `
  mutation PostKnowledgeFile($srcText: String, $idToken: String) {
    postKnowledgeFile(srcText: $srcText, idToken: $idToken) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;
export const deleteKnowledgeFile = /* GraphQL */ `
  mutation DeleteKnowledgeFile($id: ID!, $idToken: String) {
    deleteKnowledgeFile(id: $id, idToken: $idToken) {
      id
      srcText
      lastDateTimeModified
      dateTimeCreated
    }
  }
`;

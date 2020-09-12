
export const getKnowledgeFiles1 =  /* GraphQL */ `
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
  }
}
`;
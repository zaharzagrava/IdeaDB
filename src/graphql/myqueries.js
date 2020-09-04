
export const getKnowledgeFiles1 = /* GraphQL */ `
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
      properties
      lastDateTimeModified
    }
  }
`;

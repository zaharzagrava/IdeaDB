import { useMutation, useQuery } from 'react-query';
import {
  DeleteKnowledgeFileArgs,
  GetKnowledgeFilesArgs,
  KnowledgeFile,
  KnowledgeFileFields,
  PostKnowledgeFileArgs,
  PutKnowledgeFileArgs,
  QueryType,
} from '../types/types';
import { Error1 } from '../utils/utils';
import { DocumentNode, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// --- Setting up Apollo Client
export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'http://knowledgebase-env.eba-wmjem75f.us-east-1.elasticbeanstalk.com/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

export function useGetKnowledgeFiles(
  id: string,
  getKnowledgeFilesArgs: GetKnowledgeFilesArgs,
  fields: KnowledgeFileFields[]
) {
  return useQuery<KnowledgeFile[], Error>(
    [id, getKnowledgeFilesArgs, fields],
    async (key): Promise<KnowledgeFile[]> => {
      const err = (message: string) =>
        new Error1({
          message,
          name: 'backendapi/graphql.ts/useGetKnowledgeFiles',
          types: ['input-filtering', 'loud'],
        });

      const response = await client.query<
        { getKnowledgeFiles: KnowledgeFile[] },
        GetKnowledgeFilesArgs
      >({
        query: generateQuery(QueryType.getKnowledgeFiles, fields),
        variables: getKnowledgeFilesArgs,
      });

      if (response.error !== undefined) {
        console.log('@1');
        throw err('Request had an error');
      }

      return response.data.getKnowledgeFiles;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function usePostKnowledgeFile(
  onSuccess: (
    data: KnowledgeFile,
    variables: PostKnowledgeFileArgs
  ) => Promise<unknown> | void,
  fields: KnowledgeFileFields[]
) {
  return useMutation<KnowledgeFile, Error, PostKnowledgeFileArgs>(
    async (values): Promise<KnowledgeFile> => {
      const err = (message: string) =>
        new Error1({
          message,
          name: 'backendapi/graphql.ts/usePostKnowledgeFile',
          types: ['input-filtering', 'loud'],
        });

      const response = await client.query<
        { postKnowledgeFile: KnowledgeFile },
        PostKnowledgeFileArgs
      >({
        query: generateQuery(QueryType.postKnowledgeFile, fields),
        variables: values,
      });

      if (response.error !== undefined) {
        throw err('Request had an error');
      }

      return response.data.postKnowledgeFile;
    },
    {
      onSuccess: onSuccess,
    }
  );
}

export function usePutKnowledgeFile(
  onSuccess:
    | ((
        data: KnowledgeFile,
        variables: PutKnowledgeFileArgs
      ) => Promise<unknown> | void)
    | undefined,
  fields: KnowledgeFileFields[]
) {
  return useMutation<KnowledgeFile, Error, PutKnowledgeFileArgs>(
    async (variables): Promise<KnowledgeFile> => {
      const err = (message: string) =>
        new Error1({
          message,
          name: 'backendapi/graphql.ts/usePutKnowledgeFile',
          types: ['input-filtering', 'loud'],
        });
      try {
        const response = await client.query<
          { putKnowledgeFile: KnowledgeFile },
          PutKnowledgeFileArgs
        >({
          query: generateQuery(QueryType.putKnowledgeFile, fields),
          variables: variables,
        });

        if (response.error !== undefined) {
          throw err('Request had an error');
        }

        return response.data.putKnowledgeFile;
      } catch (error) {
        console.log('@error');
        throw error;
      }
    },
    {
      onSuccess: onSuccess,
    }
  );
}

export function useDeleteKnowledgeFile(
  onSuccess:
    | ((
        data: KnowledgeFile,
        variables: DeleteKnowledgeFileArgs
      ) => Promise<unknown> | void)
    | undefined,
  fields: KnowledgeFileFields[]
) {
  return useMutation<KnowledgeFile, Error, DeleteKnowledgeFileArgs>(
    async (variables): Promise<KnowledgeFile> => {
      const err = (message: string) =>
        new Error1({
          message,
          name: 'backendapi/graphql.ts/useDeleteKnowledgeFile',
          types: ['input-filtering', 'loud'],
        });

      const response = await client.query<
        { deleteKnowledgeFile: KnowledgeFile },
        DeleteKnowledgeFileArgs
      >({
        query: generateQuery(QueryType.deleteKnowledgeFile, fields),
        variables: variables,
      });

      if (response.error !== undefined) {
        throw err('Request had an error');
      }

      return response.data.deleteKnowledgeFile;
    },
    {
      onSuccess: onSuccess,
    }
  );
}

export function generateQuery(
  queryType: QueryType,
  fields: string[]
): DocumentNode {
  switch (queryType) {
    case QueryType.getKnowledgeFiles:
      return gql`
        query GetKnowledgeFiles(
          $regexList: [String!]!
          $knowledgeFileOrderSettings: [KnowledgeFileOrderSettings!]!
          $limit: Int!
          $offset: Int!
          $idToken: String!
        ) {
          getKnowledgeFiles(
            regexList: $regexList
            knowledgeFileOrderSettings: $knowledgeFileOrderSettings
            limit: $limit
            offset: $offset
            idToken: $idToken
          ) {
            ${fields.map((elem) => `${elem}\n`)}
          }
        }
      `;
    case QueryType.postKnowledgeFile:
      return gql`
          mutation PostKnowledgeFile(
            $srcText: String!,
            $idToken: String!
          ) {
            postKnowledgeFile(
              srcText: $srcText
              idToken: $idToken
            ) {
              ${fields.map((elem) => `${elem}\n`)}
            }
          }
        `;

    case QueryType.putKnowledgeFile:
      return gql`
      mutation PutKnowledgeFile(
        $id: ID!,
        $srcText: String!,
        $idToken: String!
      ) {
        putKnowledgeFile(
          id: $id,
          srcText: $srcText,
          idToken: $idToken
        ) {
          ${fields.map((elem) => `${elem}\n`)}
        }
      }
    `;

    case QueryType.deleteKnowledgeFile:
      return gql`
        mutation DeleteKnowledgeFile(
          $id: ID!,
          $idToken: String!
        ) {
          deleteKnowledgeFile(
            id: $id,
            idToken: $idToken
          ) {
            ${fields.map((elem) => `${elem}\n`)}
          }
        }
      `;
    default:
      throw new Error('There is no such queryType');
  }
}

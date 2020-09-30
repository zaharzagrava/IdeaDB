import { Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import {
  Arg,
  Args,
  ArgsDictionary,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Info,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { InfoParamMetadata } from 'type-graphql/dist/metadata/definitions';
import knex from 'knex';
import { reqWrapper } from './middleware/middleware';
import { Context } from './types/Context';
import _, { String } from 'lodash';
/**
 * GraphQL Schema
 */

export enum Direction {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum KnowledgeFileFields {
  LAST_DATE_TIME_MODIFIED = 'LAST_DATE_TIME_MODIFIED',
  DATE_TIME_CREATED = 'DATE_TIME_CREATED',
}

@InputType()
class KnowledgeFileOrderSettings {
  @Field((type) => Direction)
  orderDirection: Direction = Direction.DESC;

  @Field((type) => KnowledgeFileFields)
  orderField: KnowledgeFileFields = KnowledgeFileFields.LAST_DATE_TIME_MODIFIED;
}

@ObjectType({ description: 'Client' })
class Client {
  @Field((type) => ID)
  id: string = '';

  @Field()
  fullName: string = '';
}

@ObjectType({ description: 'Knowledge File' })
class KnowledgeFile {
  @Field((type) => ID)
  id: string = '';

  @Field({ description: 'The source text of the knowledge file' })
  srcText: string = '';

  @Field()
  lastDateTimeModified: Date = new Date();

  @Field()
  dateTimeCreated: Date = new Date();
}

@ArgsType()
class GetKnowledgeFileArgs {
  @Field((type) => ID, { nullable: false })
  id?: number;

  @Field((type) => String, { nullable: false })
  idToken?: string;
}

@ArgsType()
class PostKnowledgeFileArgs {
  @Field((type) => String, { nullable: false })
  srcText?: string;

  @Field((type) => String, { nullable: false })
  idToken?: string;
}

@ArgsType()
class PutKnowledgeFileArgs {
  @Field((type) => ID, { nullable: false })
  id?: number;

  @Field((type) => String, { nullable: false })
  srcText?: string;

  @Field((type) => String, { nullable: false })
  idToken?: string;
}

@ArgsType()
class DeleteKnowledgeFileArgs {
  @Field((type) => ID, { nullable: false })
  id?: number;

  @Field((type) => String, { nullable: false })
  idToken?: string;
}

@ArgsType()
class GetKnowledgeFilesArgs {
  @Field((type) => [String], { nullable: false })
  regexList?: string[];

  @Field((type) => [KnowledgeFileOrderSettings], { nullable: false })
  knowledgeFileOrderSettings?: KnowledgeFileOrderSettings[];

  @Field((type) => Int, { nullable: false })
  limit?: number;

  @Field((type) => Int, { nullable: false })
  offset?: number;

  @Field((type) => String, { nullable: false })
  idToken?: string;
}

@Resolver(KnowledgeFile)
export class KnowledgeFileResolver {
  // @Query(() => String)
  // async getKnowledgeFile() {}

  @UseMiddleware(reqWrapper)
  @Query(() => KnowledgeFile)
  async getKnowledgeFile(
    @Args() { id, idToken }: GetKnowledgeFileArgs,
    @Ctx() context: Context
  ) {
    id = id as number;
    idToken = idToken as string;

    let data: any = (
      await context
        .knexConnection('knowledge_file')
        .join(
          'client_knowledge_file',
          'knowledge_file.id',
          'client_knowledge_file.knowledge_file_id'
        )
        .where('knowledge_file.id', id)
        .select(context.selectionSet.map((elem) => `knowledge_file.${elem}`))
    )[0];
    // TODO: add client_id check

    let response: any = {};
    // Rewriting underscored object data to camelCased object response
    context.selectionSet.map((field) => {
      response[_.camelCase(field)] = data[field];
    });

    console.log(response);

    return response;
  }

  @UseMiddleware(reqWrapper)
  @Query(() => [KnowledgeFile])
  async getKnowledgeFiles(
    @Args()
    {
      regexList,
      knowledgeFileOrderSettings,
      limit,
      offset,
      idToken,
    }: GetKnowledgeFilesArgs,
    @Ctx() context: Context
  ): Promise<KnowledgeFile[]> {
    regexList = regexList as string[];
    knowledgeFileOrderSettings = knowledgeFileOrderSettings as KnowledgeFileOrderSettings[];
    limit = limit as number;
    offset = offset as number;
    idToken = idToken as string;

    // (IF
    const orderSettings = [];
    for (let i = 0; i < knowledgeFileOrderSettings.length; i++) {
      orderSettings.push({
        column: _.snakeCase(knowledgeFileOrderSettings[i].orderField),
        order: knowledgeFileOrderSettings[i].orderDirection,
      });
    }
    // TODO: test if regexList is valid
    // IF)

    // console.log('@orderSettings');
    // console.log(orderSettings);

    let query = context.knexConnection('knowledge_file');
    regexList = regexList as string[];
    for (var i = 0; i < regexList.length; i++) {
      const regex = regexList[i];
      if (i === 0) {
        query = query.where('knowledge_file.src_text', '~', regex);
      } else {
        query = query.andWhere('knowledge_file.src_text', '~', regex);
      }
    }

    query = query.andWhere('client_knowledge_file.client_id', context.clientId);
    limit = limit as number;

    let data = await query
      .orderBy(orderSettings)
      .limit(limit)
      .offset(offset)
      .join(
        'client_knowledge_file',
        'knowledge_file.id',
        'client_knowledge_file.knowledge_file_id'
      )
      .select(context.selectionSet.map((elem) => `knowledge_file.${elem}`));

    // console.log('@data');
    // console.log(data);

    // Rewriting underscored array data to camelCased array response
    let response: any[] = [];
    for (let i = 0; i < data.length; i++) {
      response.push({});
      context.selectionSet.map((field, index) => {
        response[i][_.camelCase(field)] = data[i][field];
      });
    }

    // console.log('@response');
    // console.log(response);

    return response;
  }

  @UseMiddleware(reqWrapper)
  @Mutation(() => KnowledgeFile)
  async postKnowledgeFile(
    @Args()
    { srcText, idToken }: PostKnowledgeFileArgs,
    @Ctx() context: Context
  ) {
    idToken = idToken as string;
    srcText = srcText as string;

    const fields = {
      src_text: srcText,
      date_time_created: 'now()',
      last_date_time_modified: 'now()',
    };

    let data = (
      await context
        .knexConnection('knowledge_file')
        .insert(fields, context.selectionSet)
    )[0];

    await context.knexConnection('client_knowledge_file').insert({
      client_id: context.clientId,
      knowledge_file_id: data.id,
    });

    let response: any = {};
    // Rewriting underscored object data to camelCased object response
    context.selectionSet.map((field) => {
      response[_.camelCase(field)] = data[field];
    });

    console.log(response);

    return response;
  }

  @UseMiddleware(reqWrapper)
  @Mutation(() => KnowledgeFile)
  async putKnowledgeFile(
    @Args()
    { id, srcText, idToken }: PutKnowledgeFileArgs,
    @Ctx() context: Context
  ) {
    id = id as number;
    idToken = idToken as string;
    srcText = srcText as string;

    const fields = {
      src_text: srcText,
      last_date_time_modified: 'now()',
    };

    let knexResponse = await context
      .knexConnection('knowledge_file')
      .join(
        'client_knowledge_file',
        'knowledge_file.id',
        'client_knowledge_file.knowledge_file_id'
      )
      .select(context.selectionSet.map((elem) => `knowledge_file.${elem}`))
      .where('knowledge_file.id', id)
      .andWhere('client_knowledge_file.client_id', context.clientId);

    if (knexResponse.length === 0) {
      throw new Error(`Knowledge File with id: ${id} does not exist`);
    }

    let data = (
      await context
        .knexConnection('knowledge_file')
        .update(fields, context.selectionSet)
        .where('knowledge_file.id', id)
    )[0];

    let response: any = {};
    // Rewriting underscored object data to camelCased object response
    context.selectionSet.map((field) => {
      response[_.camelCase(field)] = data[field];
    });

    console.log(response);

    return response;
  }

  @UseMiddleware(reqWrapper)
  @Mutation(() => KnowledgeFile)
  async deleteKnowledgeFile(
    @Args()
    { id, idToken }: DeleteKnowledgeFileArgs,
    @Ctx() context: Context
  ) {
    id = id as number;
    idToken = idToken as string;

    let knexResponse = await context
      .knexConnection('knowledge_file')
      .join(
        'client_knowledge_file',
        'knowledge_file.id',
        'client_knowledge_file.knowledge_file_id'
      )
      .select(context.selectionSet.map((elem) => `knowledge_file.${elem}`))
      .where('knowledge_file.id', id)
      .andWhere('client_knowledge_file.client_id', context.clientId);

    if (knexResponse === undefined) {
      throw new Error(`Knowledge File with id: ${id} does not exist`);
    }

    let data = knexResponse[0];

    await context.knexConnection('knowledge_file').del().where('id', id);

    let response: any = {};
    // Rewriting underscored object data to camelCased object response
    context.selectionSet.map((field) => {
      response[_.camelCase(field)] = data[field];
    });

    console.log(response);

    return response;
  }
}

import { Request, Response } from 'express';
import Knex from 'knex';

export interface Context {
  req: Request;
  res: Response;
  clientId: number;
  knexConnection: Knex<any, unknown[]>;
  selectionSet: string[];
}

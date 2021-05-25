import { HttpError } from 'routing-controllers';
import { Error } from '../errors/Error';

export class DbError extends HttpError {
  public operationName: string;
  public args: any[];

  constructor(operationName: string, args: any[] = []) {
    super(500);
    Object.setPrototypeOf(this, DbError.prototype);
    this.operationName = operationName;
    this.args = args; // can be used for internal logging

    new Error(500, this.operationName);
  }
}

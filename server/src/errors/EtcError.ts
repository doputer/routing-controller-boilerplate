import { HttpError } from 'routing-controllers';
import { Error } from './Error';

export class EtcError extends HttpError {
  public operationName: string;
  public args: any[];

  constructor(operationName: string, args: any[] = []) {
    super(500);
    Object.setPrototypeOf(this, EtcError.prototype);
    this.operationName = operationName;
    this.args = args; // can be used for internal logging

    console.log('asd');

    new Error(500, this.operationName);
  }
}

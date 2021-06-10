import { logger } from '../log/winston';

export class Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

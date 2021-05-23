import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response } from 'express';
import { Error } from '../errors/Error';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class NotFoundError implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: (err?: any) => any): any {
    if (!res.headersSent) {
      const error = new Error(404, 'Not Found Error');

      return res.status(404).send(error);
    }
    res.end();
  }
}

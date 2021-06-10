import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers';
import { Error } from '../errors/Error';
import { logger } from '../log/winston';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class ErrorHander implements ExpressErrorMiddlewareInterface {
  error(error: any, req: any, res: any, next: (err: any) => any) {
    let errorResponse;

    if (error.errors) {
      let [validatorError] = error.errors;
      const errorMessage = Object.values(
        validatorError.constraints,
      )[0].toString();

      errorResponse = new Error(400, errorMessage);
    } else {
      errorResponse = new Error(
        error.httpCode || 500,
        error.operationName || 'error',
      );
    }

    logger.error(`${errorResponse.status} / ${errorResponse.message}`);

    return res.status(errorResponse.status || 500).send(errorResponse.toJSON());
  }
}

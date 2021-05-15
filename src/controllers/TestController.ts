import { Controller, Get, HttpCode } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { logger } from '../log/winston';
import { Service } from 'typedi';
import { TestService } from '../services/TestService';
import { Response } from 'express';

@Service()
@Controller('/test')
export class TestController {
  constructor(private testService: TestService) {}

  @HttpCode(200)
  @Get()
  @OpenAPI({
    summary: 'Get 작성',
    statusCode: '200',
    security: [{ bearerAuth: [] }],
  })
  public async test() {
    // const test = await this.testService.testGet();
    // logger.debug(test);

    return 'test';
  }
}

import { Controller, Post, HttpCode } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { logger } from '../log/winston';
import { Service } from 'typedi';
import { TestService } from '../services/TestService';

@Service()
@Controller('/user')
export class TestController {
  constructor(private testService: TestService) {}

  @HttpCode(200)
  @Post()
  @OpenAPI({
    summary: '회원가입',
    statusCode: '200',
  })
  public async register() {
    
    const test = await this.testService.testGet();
    logger.debug(test);

    return 'test';
  }
}

import { Controller, Post, HttpCode, Body, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { logger } from '../log/winston';
import { Service } from 'typedi';
import { UserService } from '../services/UserService';

@Service()
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @OpenAPI({
    summary: 'Hello Webfold',
  })
  public async hello() {
    return 'hello webfold!';
  }

  @HttpCode(200)
  @Post('/login')
  @OpenAPI({
    summary: '로그인',
    statusCode: '200',
  })
  public async login(@Body() body: any) {
    const email = body.email;
    const password = body.password;

    const user = await this.userService.login(email, password);

    if (user) {
      return user;
    } else {
      return 'login fail';
    }
  }

  @HttpCode(200)
  @Post('/emailAuth')
  @OpenAPI({
    summary: '이메일 인증',
    statusCode: '200',
  })
  public async emailAuth(@Body() body: any) {
    const email = body.email;
    const user = await this.userService.sendEmailToUser(email);
    logger.debug(user);

    return 'email';
  }

  @HttpCode(200)
  @Post('/register')
  @OpenAPI({
    summary: '회원가입',
    statusCode: '200',
  })
  public async register(@Body() body: any) {
    const email = body.email;
    const nickname = body.nickname;
    const password = body.password;

    await this.userService.register(email, nickname, password);

    return '1';
  }

  @HttpCode(200)
  @Post('/password/change')
  @OpenAPI({
    summary: '비밀번호 변경',
    statusCode: '200',
  })
  public async changePassword(@Body() body: any) {
    const email = body.email;
    const password = body.password;

    await this.userService.changePassword(email, password);

    return '1';
  }
}

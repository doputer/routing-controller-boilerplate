import { Controller, Post, HttpCode, Body, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { logger } from '../log/winston';
import { Service } from 'typedi';
import { UserService } from '../services/UserService';

@Service()
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

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
  @Get('/google')
  @OpenAPI({
    summary: '구글 로그인',
    statusCode: '200',
  })
  public async googleAuth(@Body() body: any) {
    return 'google';
  }

  @HttpCode(200)
  @Get('/google/callback')
  @OpenAPI({
    summary: '구글 로그인 콜백',
    statusCode: '200',
  })
  public async googleAuthCallback(@Body() body: any) {
    return 'google-success';
  }

  @HttpCode(200)
  @Get('/naver')
  @OpenAPI({
    summary: '네이버 로그인',
    statusCode: '200',
  })
  public async naverAuth(@Body() body: any) {
    return 'naver';
  }

  @HttpCode(200)
  @Get('/naver/callback')
  @OpenAPI({
    summary: '네이버 로그인 콜백',
    statusCode: '200',
  })
  public async naverAuthCallback(@Body() body: any) {
    return 'naver-success';
  }
}

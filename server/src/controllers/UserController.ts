import { Controller, Post, HttpCode, Body } from 'routing-controllers';
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
}

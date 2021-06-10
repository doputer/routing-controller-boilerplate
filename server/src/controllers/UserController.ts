import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  HttpCode,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { UserService } from '../services/UserService';
import { Email, Login, Register } from '../validator/userValidator';

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
  })
  public async login(@Body() body: Login) {
    let { email, password } = body;

    const user = await this.userService.login(email, password);

    if (user) {
      return user;
    } else {
      return 'login fail';
    }
  }

  @HttpCode(200)
  @Post('/email-auth')
  @OpenAPI({
    summary: '이메일 인증',
  })
  public async emailAuth(@Body() body: Email) {
    let { email } = body;

    const user = await this.userService.sendEmailToUser(email);

    return 'email';
  }

  @HttpCode(201)
  @Post('/register')
  @OpenAPI({
    summary: '회원가입',
  })
  public async register(@Body() body: Register) {
    let { email, nickname, password } = body;

    await this.userService.register(email, nickname, password);

    return '1';
  }

  @HttpCode(200)
  @Patch('/password')
  @OpenAPI({
    summary: '비밀번호 변경',
  })
  public async changePassword(@Body() body: Login) {
    let { email, password } = body;

    await this.userService.changePassword(email, password);

    return '1';
  }
}

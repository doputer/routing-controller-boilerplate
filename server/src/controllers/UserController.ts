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
import { Email, Login, Register } from '../validators/userValidator';

@Service()
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @Post('/login')
  @OpenAPI({
    summary: '로그인',
    responses: {
      '200': {
        description: '로그인 성공',
      },
      '400': {
        description: '잘못된 이메일, 비밀번호 에러',
      },
      '422': {
        description: '발리데이터 에러',
      },
    },
  })
  public async login(@Body() body: Login) {
    let { email, password } = body;

    const user = await this.userService.login(email, password);

    return { user };
  }

  @HttpCode(200)
  @Post('/email-auth')
  @OpenAPI({
    summary: '이메일 인증',
    responses: {
      '200': {
        description: '이메일 인증 성공',
      },
      '422': {
        description: '발리데이터 에러',
      },
    },
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
    responses: {
      '201': {
        description: '회원가입 성공',
      },
      '400': {
        description: '이미 가입된 사용자',
      },
      '422': {
        description: '발리데이터 에러',
      },
      '500': {
        description: 'bcrypt 에러',
      },
    },
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
    responses: {
      '200': {
        description: '비밀번호 변경 성공',
      },
      '400': {
        description: '존재하지 않는 이메일',
      },
      '422': {
        description: '발리데이터 에러',
      },
      '500': {
        description: 'bcrypt 에러',
      },
    },
  })
  public async changePassword(@Body() body: Login) {
    let { email, password } = body;

    await this.userService.changePassword(email, password);

    return '1';
  }
}

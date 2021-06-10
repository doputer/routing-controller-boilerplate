import { Length, IsEmail, IsString } from 'class-validator';

export class Login {
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  public email: string;

  @Length(8, 16, { message: '비밀번호는 8자리 이상 입력해주세요.' })
  public password: string;
}

export class Email {
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  public email: string;
}

export class Register {
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  public email: string;

  @IsString()
  public nickname: string;

  @Length(8, 16, { message: '비밀번호는 8자리 이상 입력해주세요.' })
  public password: string;
}

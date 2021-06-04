import { emailConfigs } from '../utils/config';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/UserEntity';
import { DbError } from '../errors/DbError';
import { EtcError } from '../errors/EtcError';
import { callbackify } from 'util';

@Service()
export class UserService {
  @InjectRepository()
  private readonly userRepository: UserRepository;

  public async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  public async sendEmailToUser(email: string) {
    let authNum = Math.random().toString().substr(2, 6);

    const mailOptions = {
      from: 'toysite111@gmail.com',
      to: email,
      subject: '이메일 인증',
      text: '이메일 인증 코드 ' + authNum,
    };

    let info = await emailConfigs.sendMail(mailOptions, (error, responses) => {
      if (error) {
        console.log(error);
      }
      emailConfigs.close();
      return responses;
    });
  }

  public async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getUserByEmail(email);

    if (user) {
      const isLogin = await bcrypt.compare(password, user.password);

      if (isLogin) {
        return user;
      } else {
        throw new DbError('비밀번호가 일치하지 않습니다.');
      }
    } else {
      throw new DbError('존재하지 않는 이메일 입니다.');
    }
  }

  public async register(email: string, nickname: string, password: string) {
    const isRegister = await this.userRepository.getUserByEmail(email);

    if (isRegister) {
      throw new DbError('이미 가입된 사용자 입니다.');
    } else {
      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) throw new EtcError('bcrypt error');
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw new EtcError('bcrypt error');
          password = hash;
          
         

          const user = new User();
          user.email = email;
          user.nickname = nickname;
          user.password = password;

          

          await this.userRepository.save(user);
        });
      });
    }
  }
}

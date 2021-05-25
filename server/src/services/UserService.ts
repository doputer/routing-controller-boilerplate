import { UserRepository } from "../repositories/UserRepository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { emailConfigs } from "../utils/config";
import ejs from "ejs";
import { response } from "express";

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
      from: "toysite111@gmail.com",
      to: email,
      subject: "이메일 인증",
      text: "이메일 인증 코드 " + authNum,
    };

    let info = await emailConfigs.sendMail(mailOptions, (error, responses) => {
      if (error) {
        console.log(error);
      }
      emailConfigs.close();
      return responses;
    });
  }
}

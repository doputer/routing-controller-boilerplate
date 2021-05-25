import { UserRepository } from "../repositories/UserRepository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { emailConfigs } from "../utils/config";

@Service()
export class UserService {
  @InjectRepository()
  private readonly userRepository: UserRepository;

  public async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  public async sendEmailToUser(email: string) {
    console.log(email);
    const mailOptions = {
      from: "toysite111@gmail.com",
      to: email,
      subject: "이메일 인증",
      text: "이메일 인증 코드 입니다.",
    };

    let info = await emailConfigs.sendMail(mailOptions, (error, responses) => {
      if (error) {
        console.log(error);
      }
      console.log("Finish sending email");
      emailConfigs.close();
      return responses;
    });
  }
}

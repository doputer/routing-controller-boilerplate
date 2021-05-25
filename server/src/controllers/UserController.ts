import { Controller, Post, HttpCode, Body } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { logger } from "../log/winston";
import { Service } from "typedi";
import { UserService } from "../services/UserService";

@Service()
@Controller("/user")
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @Post("/login")
  @OpenAPI({
    summary: "로그인",
    statusCode: "200",
  })
  public async login(@Body() body: any) {
    const email = body.email;
    const user = await this.userService.getUserByEmail(email);
    logger.debug(user);

    return "test";
  }

  @HttpCode(200)
  @Post("/emailAuth")
  @OpenAPI({
    summary: "이메일 인증",
    statusCode: "200",
  })
  public async emailAuth(@Body() body: any) {
    const email = body.email;
    const user = await this.userService.sendEmailToUser(email);
    logger.debug(user);

    return "email";
  }
}

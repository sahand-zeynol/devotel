import { Controller, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth, User } from "../common/decorators";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "./entities";

@ApiTags("Users")
@UsePipes(new ValidationPipe({ transform: true }))
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get()
  async getMe(@User() user: UserEntity) {
    return await this.userService.getMe(user);
  }
}

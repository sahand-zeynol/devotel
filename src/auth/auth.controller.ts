import { Controller, Post, Get, UseGuards, Body } from "@nestjs/common";
import { LocalAuthGuard } from "./guards";
import { User, Auth } from "../common/decorators";
import { User as UserEntity } from "../user/entities";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dtos/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
    return this.authService.login(user);
  }

  @Auth()
  @Get("me")
  me(@User() user: UserEntity) {
    if (!user.id) {
      return { data: null };
    }
    return {
      data: user,
    };
  }

  @Auth()
  @Get("refresh")
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: "Refresh token",
      data,
    };
  }
}

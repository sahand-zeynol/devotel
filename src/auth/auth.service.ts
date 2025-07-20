import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { UserService } from "../user/user.service";
import { User } from "../user/entities";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ username });

    if (user && (await compare(pass, user.password))) {
      const { password, createdAt, ...rest } = user;
      console.log(password, createdAt);
      return rest;
    }

    return null;
  }

  login(user: User) {
    const { id, ...rest } = user;
    console.log(rest);
    const payload = { id };

    return {
      user,
      accessToken: this.jwtService.sign(payload, { expiresIn: "365d" }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: "7d" }),
      expires: 365 * 24 * 60 * 60,
    };
  }

  async verify(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}

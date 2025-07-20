import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "./entities";

export interface UserFindOne {
  id?: number;
  username?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({
        select: ["id", "firstName", "lastName", "username"],
        where: { id },
      })
      .then((u) =>
        !userEntity ? u : !!u && userEntity.id === u.id ? u : null
      );

    if (!user)
      throw new NotFoundException("User does not exists or unauthorized");

    return user;
  }

  async getMe(user: UserEntity) {
    return {
      ...user,
    };
  }

  async findOne(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder("user")
      .where(data)
      .addSelect("user.password")
      .getOne();
  }
}

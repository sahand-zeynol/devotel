import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  DEFAULT_USER_USERNAME,
  DEFAULT_USER_PASSWORD,
} from '../config/constants';
import { User } from '../user/entities';

const setDefaultUser = async (config: ConfigService) => {
  const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
  });

  await PostgresDataSource.initialize();

  const defaultUser = await PostgresDataSource.manager.findOne(User, {
    where: {
      username: config.get<string>('DEFAULT_USER_USERNAME'),
    },
  });

  if (!defaultUser) {
    const adminUser = PostgresDataSource.manager.create(User, {
      username: config.get<string>(DEFAULT_USER_USERNAME),
      password: config.get<string>(DEFAULT_USER_PASSWORD),
    });

    return await PostgresDataSource.manager.save(adminUser);
  }
};

export default setDefaultUser;

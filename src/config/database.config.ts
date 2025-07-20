import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { DataSourceOptions } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export function typeormModuleOptions():
  | TypeOrmModuleOptions
  | DataSourceOptions {
  return {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [join(__dirname, "../**/**/*entity{.ts,.js}")],
    synchronize: true,
    logging: true,
  };
}

export default registerAs("database", () => ({
  config: typeormModuleOptions(),
}));

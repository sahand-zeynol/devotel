import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { initSwagger } from "./app.swagger";
import { ConfigService } from "@nestjs/config";
import { SERVER_PORT } from "./config/constants";
import { setDefaultUser } from "./scripts";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  const logger = new Logger("Bootstrap");
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;
  initSwagger(app);
  setDefaultUser(config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  await app.listen(port);
  logger.log(`Server is running at ${await app.getUrl()}`);
  logger.log(`Server is running at development mode`);
}
bootstrap();

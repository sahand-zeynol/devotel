import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("DEVOTEL API")
    .addBearerAuth()
    .setDescription("Its written by Sahand.")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/api/docs", app, document, {
    swaggerOptions: { displayRequestDuration: true },
  });
};

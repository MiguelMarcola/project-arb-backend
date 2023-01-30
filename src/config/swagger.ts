import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

export class ConfigSwagger {
  constructor(private readonly app: INestApplication) {}

  public createDocument() {
    const document = SwaggerModule.createDocument(
      this.app,
      this.getBuildDocument(),
    );

    SwaggerModule.setup(process.env.DOCUMENTATION_ENDPOINT, this.app, document);
  }
  private getBuildDocument(): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder()
      .setTitle(process.env.PROJECT_NAME)
      .setDescription(process.env.PROJECT_DESCRIPTION)
      .setVersion(process.env.DOCUMENTATION_VERSION)
      .build();
  }
}

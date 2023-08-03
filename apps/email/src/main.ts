import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['0.0.0.0:9092'],
      },
      consumer: {
        groupId: 'email-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3010);
}
bootstrap();

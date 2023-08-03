import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'email',
            brokers: ['0.0.0.0:9092'],
          },
        },
      },
    ]),
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        secure: false,
        port: 2525,
        auth: {
          user: 'b8cae1341d2c88',
          pass: '18c52e5db8dc9a',
        },
        ignoreTLS: true,
      },
      defaults: {
        from: 'aureliomoreiranfe@gmail.com',
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}

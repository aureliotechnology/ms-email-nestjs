import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { lastValueFrom } from 'rxjs';

@Controller('/')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    @Inject('EMAIL_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  @MessagePattern('email')
  async complete(@Payload() message) {
    try {
      await this.emailService.sendEmailService(
        message.to,
        message.toName,
        message.from,
        message.fromName,
        message.subject,
        message.html,
      );
    } catch (error) {
      if (message?.retry < 5) {
        message.retry = message?.retry + 1;
        await lastValueFrom(this.kafkaClient.emit('email', message));
      }
    }
  }
}

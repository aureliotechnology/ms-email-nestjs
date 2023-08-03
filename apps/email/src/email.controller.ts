import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller('/')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

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
      console.log(error);
    }
  }
}

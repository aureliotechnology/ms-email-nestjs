import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailService(
    to: string,
    toName: string,
    from: string,
    fromName: string,
    subject: string,
    html: string,
  ) {
    await this.mailerService.sendMail({
      to: `${toName} <${to}>`,
      from: `${fromName} <${from}>`,
      subject: subject,
      html: html,
    });
  }
}

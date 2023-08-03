import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from '../../src/email.service';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send email', async () => {
    const to = 'to@example.com';
    const toName = 'To Name';
    const from = 'from@example.com';
    const fromName = 'From Name';
    const subject = 'Test Subject';
    const html = '<h1>Test HTML</h1>';

    await service.sendEmailService(to, toName, from, fromName, subject, html);

    expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: `${toName} <${to}>`,
      from: `${fromName} <${from}>`,
      subject: subject,
      html: html,
    });
  });
});

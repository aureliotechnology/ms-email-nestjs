import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../../src/email.service';
import { EmailController } from '../../src/email.controller';

describe('EmailController', () => {
  let controller: EmailController;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: EmailService,
          useValue: {
            sendEmailService: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send email', async () => {
    const message = {
      to: 'to@example.com',
      toName: 'To Name',
      from: 'from@example.com',
      fromName: 'From Name',
      subject: 'Test Subject',
      html: '<h1>Test HTML</h1>',
    };

    await controller.complete({ value: message });

    expect(emailService.sendEmailService).toHaveBeenCalledTimes(1);
  });
});

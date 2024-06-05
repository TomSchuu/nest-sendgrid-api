import { Controller, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDataRequired } from '@sendgrid/mail';

@Controller('/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send')
  async sendMail(@Query('email') email): Promise<void> {
    const message: MailDataRequired = {
      to: {
        email: email,
      },
      from: {
        email: 'ValidSendGridEmail@exmaple.com',
        name: 'ValidSenderName',
      },
      subject: 'Your Example Order Confirmation',
      content: [
        {
          type: 'text/html',
          value:
            '<p>Hello from email service!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.',
        },
      ],
    };
    await this.mailService.sendMail(message);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('SEND_GRID_API_KEY'));
  }

  async sendMail(mail: SendGrid.MailDataRequired): Promise<void> {
    await SendGrid.send(mail)
      .then(() => console.log('Mail sent successfully'))
      .catch((error) => {
        console.error(error);
        console.error(error.response.body.errors);
      });
  }
}

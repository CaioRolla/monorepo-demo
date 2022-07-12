import { Injectable, LoggerService } from '@nestjs/common';
const Slack = require('slack');

export interface SlackLoggerConfig {
  botToken: string;

  logChannelId: string;
  errorChannelId: string;
  warnChannelId: string;
}

@Injectable()
export class SlackLogger implements LoggerService {
  public readonly bot = new Slack({ token: this.config.botToken });

  constructor(public config: SlackLoggerConfig) {}

  public async log(message: any, context?: string) {
    this.bot.chat.postMessage({
      channel: this.config.logChannelId,
      text: message,
    });
  }

  public async error(message: any, trace?: string, context?: string) {
    this.bot.chat.postMessage({
      channel: this.config.errorChannelId,
      text: `${message} ### ${trace}`,
    });
  }

  public async warn(message: any, context?: string) {
    this.bot.chat.postMessage({ channel: this.config.warnChannelId, text: `${message} ### ${context}` });
  }
}

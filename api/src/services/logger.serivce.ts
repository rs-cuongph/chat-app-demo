// logger.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  private channel = 'APP';

  getState() {
    return this.channel;
  }

  setState(newChannel: string) {
    this.channel = newChannel;
  }

  log() {}
}

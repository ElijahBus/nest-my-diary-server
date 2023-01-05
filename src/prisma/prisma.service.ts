import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]).then((r) => console.log('DB RESET - ', r.length));
  }
}

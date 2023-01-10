import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from './bookmark/persistance/bookmark.entity';
import { BookModule } from './bookmarks/books.module';
import { BookmarkTodoEntity } from './bookmarks/dto/bookmark.todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://luesqung:7dNP_FqGw-1UAyi2OUJ11hB15CaFOByv@rosie.db.elephantsql.com/luesqung',
      entities: [BookmarkEntity, BookmarkTodoEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    BookModule,
  ],
})
export class AppModule {}

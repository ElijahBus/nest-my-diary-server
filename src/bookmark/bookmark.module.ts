import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkController } from './controllers/bookmark.controller';
import { BookmarkEntity } from './persistance/bookmark.entity';
import { BookmarkRepository } from './persistance/bookmark.repository';
import { BookmarkCommands } from './usecases/bookmark.usecases.commands';
import { BookmarkQueries } from './usecases/bookmark.usecases.queries';

@Module({
  controllers: [BookmarkController],
  imports: [TypeOrmModule.forFeature([BookmarkEntity])],
  providers: [BookmarkRepository, BookmarkCommands, BookmarkQueries],
})
export class BookmarkModule {}

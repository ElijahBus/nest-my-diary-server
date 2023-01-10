import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { BookmarkTodoEntity } from './dto/bookmark.todo.entity';

@Module({
  controllers: [BookController],
  imports: [TypeOrmModule.forFeature([BookmarkTodoEntity])],
  providers: [BookmarkService],
})
export class BookModule {}

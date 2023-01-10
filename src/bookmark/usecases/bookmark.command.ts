import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { Bookmark } from '../domains/bookmark';

export class CreateBookmarkCommand {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: CreateBookmarkCommand): Bookmark {
    const bookmark = new Bookmark();
    bookmark.title = command.title;
    bookmark.description = command.description;
    return bookmark;
  }
}
export class UpdateBookmarkCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: UpdateBookmarkCommand): Bookmark {
    const bookmark = new Bookmark();
    bookmark.id = command.id;
    bookmark.title = command.title;
    bookmark.description = command.description;
    return bookmark;
  }
}

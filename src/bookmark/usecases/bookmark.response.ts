import { ApiProperty } from '@nestjs/swagger';
import { Bookmark } from '../domains/bookmark';
import { BookmarkEntity } from '../persistance/bookmark.entity';

export class BookmarkResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;

  static fromDomain(bookmark: Bookmark): BookmarkResponse {
    const bookmarkResponse = new BookmarkResponse();
    bookmarkResponse.id = bookmark.id;
    bookmarkResponse.title = bookmark.title;
    bookmarkResponse.description = bookmark.description;
    return bookmarkResponse;
  }
  static fromEntity(bookmarkEntity: BookmarkEntity): BookmarkResponse {
    const bookmarkResponse = new BookmarkResponse();
    bookmarkResponse.id = bookmarkEntity.id;
    bookmarkResponse.title = bookmarkEntity.title;
    bookmarkResponse.description = bookmarkEntity.description;
    return bookmarkResponse;
  }
}

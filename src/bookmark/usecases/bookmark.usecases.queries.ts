import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookmarkEntity } from '../persistance/bookmark.entity';
import { BookmarkResponse } from './bookmark.response';

export class BookmarkQueries {
  constructor(
    @InjectRepository(BookmarkEntity)
    private bookmarkReository: Repository<BookmarkEntity>,
  ) {}

  async getBookmark(id: string): Promise<BookmarkResponse> {
    const bookmark = await this.bookmarkReository.find({
      where: { id: id },
      relations: [],
    });
    if (!bookmark[0]) {
      throw new NotFoundException(`bookmark not found with id ${id}`);
    }
    return BookmarkResponse.fromEntity(bookmark[0]);
  }

  async getBookmarks(): Promise<BookmarkResponse[]> {
    const bookmark = await this.bookmarkReository.find();
    const d = bookmark.map((entity) => BookmarkResponse.fromEntity(entity));
    return d;
  }
}

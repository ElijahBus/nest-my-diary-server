import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from '../domains/bookmark';
import { IBookmarkRepository } from '../domains/bookmark.repository.interface';
import { BookmarkEntity } from './bookmark.entity';

export class BookmarkRepository implements IBookmarkRepository {
  constructor(
    @InjectRepository(BookmarkEntity)
    private bookmarkReository: Repository<BookmarkEntity>,
  ) {}

  async insert(bookmark: Bookmark): Promise<Bookmark> {
    const bookmarkEntity = this.toBookmarkEntity(bookmark);
    const result = await this.bookmarkReository.save(bookmarkEntity);
    return result ? this.toBookmark(result) : null;
  }
  async update(id: string, bookmark: Bookmark): Promise<Bookmark> {
    const bookmarkEntity = this.toBookmarkEntity(bookmark);
    const result = await this.bookmarkReository.save(bookmarkEntity);
    return result ? this.toBookmark(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.bookmarkReository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(): Promise<Bookmark[]> {
    const bookmarks = await this.bookmarkReository.find({
      relations: [],
    });
    if (!bookmarks.length) {
      return null;
    }
    return bookmarks.map((bookmark) => this.toBookmark(bookmark));
  }
  async getById(id: string): Promise<Bookmark> {
    const bookmark = await this.bookmarkReository.find({
      where: { id: id },
    });
    if (!bookmark[0]) {
      return null;
    }
    return this.toBookmark(bookmark[0]);
  }
  toBookmark(bookmarkEntity: BookmarkEntity): Bookmark {
    const bookmark: Bookmark = new Bookmark();
    bookmark.id = bookmarkEntity.id;
    bookmark.title = bookmarkEntity.title;
    bookmark.description = bookmarkEntity.description;
    return bookmark;
  }
  toBookmarkEntity(bookmark: Bookmark): BookmarkEntity {
    const bookmarkEntity: BookmarkEntity = new BookmarkEntity();
    bookmarkEntity.id = bookmark.id;
    bookmarkEntity.title = bookmark.title;
    bookmarkEntity.description = bookmark.description;
    return bookmarkEntity;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { BookmarkRepository } from '../persistance/bookmark.repository';
import {
  CreateBookmarkCommand,
  UpdateBookmarkCommand,
} from './bookmark.command';
import { BookmarkResponse } from './bookmark.response';

@Injectable()
export class BookmarkCommands {
  constructor(private bookmarkRepository: BookmarkRepository) {}

  async createBookmark(
    command: CreateBookmarkCommand,
  ): Promise<BookmarkResponse> {
    const bookmark = CreateBookmarkCommand.fromCommands(command);
    const result = await this.bookmarkRepository.insert(bookmark);
    console.log(result);
    return BookmarkResponse.fromDomain(result);
  }
  async updateBookmark(
    id: string,
    command: UpdateBookmarkCommand,
  ): Promise<BookmarkResponse> {
    let bookmark = await this.bookmarkRepository.getById(id);
    if (bookmark != null) {
      bookmark = UpdateBookmarkCommand.fromCommands(command);
      const result = await this.bookmarkRepository.insert(bookmark);
      return BookmarkResponse.fromDomain(result);
    }
    return null;
  }
  async DeleteBookmark(id: string): Promise<boolean> {
    const bookmark = await this.bookmarkRepository.getById(id);
    if (!bookmark) {
      throw new NotFoundException(`bookmark not found with id ${id}`);
    }
    const result = await this.bookmarkRepository.delete(id);

    return result;
  }
}

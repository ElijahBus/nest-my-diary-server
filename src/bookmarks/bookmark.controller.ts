import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { IBookmark } from './interfa/bookamrk.interface';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private bookmarkService: BookmarkService) {}

  // Action to get all bookmarks
  @Get('get-books')
  async getAll() {
    const bookmarks: Array<BookmarkDto> = await this.bookmarkService.getAll();
    return bookmarks;
  }

  // Find one bookmark
  @Get('get-book:/id')
  async get(@Param('id') id: number) {
    return await this.bookmarkService.get(id);
  }

  // Create a bookmark
  @Post('create-book')
  async create(@Body() bookmarkDto: BookmarkDto) {
    const bookmark = await this.bookmarkService.create(bookmarkDto);
    if (!bookmark) {
      return 'error in creating todo';
    }
    //return 'bookmark created successfully';
    return bookmark;
  }

  // Update a bookmark
  @Put('update-book')
  async update(@Param('id') id: number, @Body() body: BookmarkDto) {
    return await this.bookmarkService.update(id, body);
  }

  // Delete a bookmark
  @Delete('remove-book/:id')
  async remove(@Param('id') id: number) {
    await this.bookmarkService.delete(id);
    return 'book deleted';
  }
}

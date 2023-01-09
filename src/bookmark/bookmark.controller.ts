import { Controller, Get } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {

  constructor(private bookmarkService: BookmarkService) {
  }

  // Action to get all bookmarks
  @Get()
  getAll(): string {
    return this.bookmarkService.getAll();
  }

  // Find one bookmark 

  // Create a bookmark

  // Update a bookmark

  // Delete a bookmark 
}

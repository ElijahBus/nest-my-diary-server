import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateBookmarkCommand,
  UpdateBookmarkCommand,
} from '../usecases/bookmark.command';
import { BookmarkResponse } from '../usecases/bookmark.response';
import { BookmarkCommands } from '../usecases/bookmark.usecases.commands';
import { BookmarkQueries } from '../usecases/bookmark.usecases.queries';

@Controller('bookmarks')
@ApiTags('bookmarks')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
export class BookmarkController {
  constructor(
    private commands: BookmarkCommands,
    private queries: BookmarkQueries,
  ) {}

  @Get('get-bookmark/:id')
  @ApiOkResponse({ type: BookmarkResponse })
  async getBookmark(@Param('id') id: string) {
    return this.queries.getBookmark(id);
  }
  @Get('get-bookmarks')
  @ApiOkResponse({ type: BookmarkResponse })
  async getBookmarks() {
    return this.queries.getBookmarks();
  }

  @Post('create-bookmark')
  @ApiOkResponse({ type: BookmarkResponse })
  async createBookmark(@Body() createBookmarkCommand: CreateBookmarkCommand) {
    return await this.commands.createBookmark(createBookmarkCommand);
  }
  @Put('update-bookmark')
  @ApiOkResponse({ type: BookmarkResponse })
  async updateBookmark(
    @Param('id') id: string,
    @Body() updateBookmarkCommand: UpdateBookmarkCommand,
  ) {
    return await this.commands.updateBookmark(id, updateBookmarkCommand);
  }
  @Delete('delete-bookmark/:id')
  @ApiOkResponse({ type: Boolean })
  async DeleteBookmark(@Param('id') id: string) {
    return this.commands.DeleteBookmark(id);
  }
}

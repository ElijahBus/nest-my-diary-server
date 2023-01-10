import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkTodoEntity } from './dto/bookmark.todo.entity';
import { IBookmark } from './interfa/bookamrk.interface';
import { Repository } from 'typeorm';
import { BookmarkDto } from './dto/bookmark.dto';
@Injectable()
export class BookmarkService {
  // private readonly bookmarks: Bookmark[] = [];
  constructor(
    @InjectRepository(BookmarkTodoEntity)
    private todoRepository: Repository<BookmarkTodoEntity>,
  ) {}
  // Action to get all bookmarks
  async getAll(): Promise<BookmarkDto[]> {
    return await this.todoRepository.find();
  }

  // Find one bookmark
  async get(id: number) {
    const todo = await this.todoRepository.find({ where: { id: id } });
    if (todo) {
      return todo;
    }
    throw new HttpException('book not found', HttpStatus.NOT_FOUND);
  }

  // Create a bookmark
  async create(bookmark: BookmarkDto): Promise<BookmarkDto> {
    return await this.todoRepository.save(bookmark);
  }

  // Update a bookmark
  async update(id: number, bookmark: BookmarkDto) {
    await this.todoRepository.save(bookmark);
    const updatedTodo = await this.todoRepository.find({
      where: { id: id },
    });
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('book not found', HttpStatus.NOT_FOUND);
  }

  // Delete a bookmark
  async delete(id: number) {
    const deletedTodo = await this.todoRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('book not found', HttpStatus.NOT_FOUND);
    }
  }
}

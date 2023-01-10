import { Bookmark } from './bookmark';

export interface IBookmarkRepository {
  insert(bookmark: Bookmark): Promise<Bookmark>;
  update(id: string, bookmark: Bookmark): Promise<Bookmark>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Bookmark[]>;
  getById(id: string): Promise<Bookmark>;
}

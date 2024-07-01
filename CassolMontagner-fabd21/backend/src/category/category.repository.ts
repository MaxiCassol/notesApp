import { Repository, DeleteResult } from 'typeorm';
import { Category } from './entity/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  create(category: Partial<Category>): Category {
    return this.repository.create(category);
  }

  save(category: Category): Promise<Category> {
    return this.repository.save(category);
  }

  find(): Promise<Category[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

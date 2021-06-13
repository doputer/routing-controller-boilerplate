import { Service } from 'typedi';
import { EntityRepository, Like, Repository } from 'typeorm';
import { Post } from '../entities/PostEntity';

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  public async getPostsByKeyword(keyword: string): Promise<Post[]> {
    return await this.find({ title: Like(`%${keyword}%`) });
  }
}

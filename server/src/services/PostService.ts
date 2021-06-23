import { PostRepository } from '../repositories/PostRepository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Search } from '../validators/postValidator';
import { Post } from '../entities/PostEntity';

@Service()
export class PostService {
  @InjectRepository()
  private readonly postRepository: PostRepository;

  public async landAllPosts(): Promise<Post[]> {
    // landing page
    return await this.postRepository.getAll();
  }

  public async searchPosts(query: Search): Promise<Post[]> {
    // 키워드 검색
    return await this.postRepository.getPostsByKeyword(query.keyword);
  }
}

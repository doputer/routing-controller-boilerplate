import { Controller, Get, HttpCode, QueryParams } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { PostService } from '../services/PostService';
import { Service } from 'typedi';
import { Search } from '../validators/postValidator';

@Service()
@Controller('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @HttpCode(200)
  @Get('/main')
  @OpenAPI({
    summary: '랜딩페이지',
    responses: {
      '200': {
        description: '페이지 랜딩 성공',
      },
      '422': {
        description: '발리데이터 에러',
      },
    },
  })
  public async landAllPosts() {
    return await this.postService.landAllPosts();
  }

  @HttpCode(200)
  @Get('/search')
  @OpenAPI({
    summary: '검색',
    responses: {
      '200': {
        description: '검색 성공',
      },
      '422': {
        description: '발리데이터 에러',
      },
    },
  })
  public async searchPosts(@QueryParams() query: Search) {
    return await this.postService.searchPosts(query);
  }
}

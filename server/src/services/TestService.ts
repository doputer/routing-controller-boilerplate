import { TestRepository } from '../repositories/TestRepository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class TestService {
  @InjectRepository()
  private readonly testRepository: TestRepository;

  public async testGet() {
    return await this.testRepository.saveTest();
  }
}

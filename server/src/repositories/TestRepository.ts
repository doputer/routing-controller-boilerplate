import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Test } from '../entities/TestEntity';

@Service()
@EntityRepository(Test)
export class TestRepository extends Repository<Test> {
  async saveTest(): Promise<Test> {
    const test = new Test();

    test.name = 'test';
    return await this.save(test);
  }
}

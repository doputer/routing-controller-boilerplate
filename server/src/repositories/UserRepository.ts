import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/UserEntity';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({email: email});
  }
}

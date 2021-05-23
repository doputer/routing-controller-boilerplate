import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/UserEntity';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // async register(): Promise<User> {
  //   const user = new User();

  //   user.name = 'user';
  //   return await this.save(user);
  // }
}

import { UserRepository } from '../repositories/UserRepository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService {
  @InjectRepository()
  private readonly userRepository: UserRepository;

  public async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}

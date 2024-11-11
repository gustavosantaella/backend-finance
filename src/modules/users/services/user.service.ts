import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findById(id: string | number) {
    return this.userRepository.findByid(id);
  }
}

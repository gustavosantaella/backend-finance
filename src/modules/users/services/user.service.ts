import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserEntity } from '../domain/entities/user.entity'; // Cambia a UserEntity

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findById(id: string | number): Promise<UserEntity | null> {
      return this.userRepository.findById(id);
  }

  public async findByFirstName(firstName: string): Promise<UserEntity | null> {
      return this.userRepository.findByFirstName(firstName); // Llama al método correcto del repositorio
  }

  public async findAll(): Promise<UserEntity[]> {
      return this.userRepository.findAll();
  }

  public async create(userData: Partial<UserEntity>): Promise<UserEntity> {
      return this.userRepository.create(userData);
  }
}

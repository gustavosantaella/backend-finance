// src/modules/users/domain/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity'; // Asegúrate de que la ruta sea correcta
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
      @InjectRepository(UserEntity)
      private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async findById(id: string | number): Promise<UserEntity | null> {
      const numericId = typeof id === 'string' ? parseInt(id, 10) : id; // Convierte a número si es necesario
      return this.userRepo.findOne({ where: { id: numericId } });
  }

  public async findByFirstName(firstName: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { firstName } }); // Busca por firstName
}

  public async findAll(): Promise<UserEntity[]> {
      return this.userRepo.find();
  }

  public async create(userData: Partial<UserEntity>): Promise<UserEntity> {
      const user = this.userRepo.create(userData);
      return this.userRepo.save(user);
  }
}


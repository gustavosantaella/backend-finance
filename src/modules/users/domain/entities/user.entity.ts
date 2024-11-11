import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: true, name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}

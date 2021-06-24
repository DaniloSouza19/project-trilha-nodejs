import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('users')
class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;
}

export { Users };

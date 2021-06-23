import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Post } from './PostEntity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column()
  nickname: string;

  @OneToMany(type => Post, post => post.author)
  posts: Post[];

  @CreateDateColumn()
  registeredAt: Date;

  @ManyToMany(type => Post, post => post.bookMarkUsers)
  bookMarkPosts : Post[];
}

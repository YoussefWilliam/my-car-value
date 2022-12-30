import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    const user = this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<User>) {
    const myUser = await this.findOne(id);
    if (!myUser) {
      throw new NotFoundException('user is not found!');
    }
    Object.assign(myUser, attrs);
    return this.repo.save(myUser);
  }

  async delete(id: number) {
    const myUser = await this.findOne(id);
    if (!myUser) {
      throw new NotFoundException('user is not found!');
    }
    return this.repo.remove(myUser);
  }
}

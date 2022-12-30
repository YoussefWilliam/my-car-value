import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`User with id: ${this.id} is created successfully`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with id: ${this.id} is updated successfully`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User with id: ${this.id} is deleted successfully`);
  }
}

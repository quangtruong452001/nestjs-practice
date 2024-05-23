import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      username: 'anle',
      fullname: 'Le Dang Hoang An',
      role: 'Developer',
      project: ['D&D', 'Tiger'],
      activeYn: 'Y',
    },
    {
      username: 'johnsmith',
      fullname: 'John Smith',
      role: 'Designer',
      project: ['Web Design', 'UI/UX'],
      activeYn: 'Y',
    },
    {
      username: 'janedoe',
      fullname: 'Jane Doe',
      role: 'Product Manager',
      project: ['Mobile App', 'Analytics'],
      activeYn: 'N',
    },
  ];

  findUser(req): User {
    return this.users.find((user) => user.username === username) as User;
  }

  updateUser(username: string, user: User): User {
    const index = this.users.findIndex((user) => user.username === username);
    this.users[index] = user;
    return user;
  }

  deleteUser(username: string): User {
    const index = this.users.findIndex((user) => user.username === username);
    const user = this.users[index];
    this.users.splice(index, 1);
    return { ...user, activeYn: user.activeYn as 'Y' | 'N' };
  }

  insertUser(user: User): User {
    this.users.push(user);
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { UserInput, UserOptional, UserResponse, User } from './user.interface';

function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}
function compareStringsIgnoreCase(str1, str2) {
  return removeSpaces(str1).toLowerCase() === removeSpaces(str2).toLowerCase();
}
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

  findUser(query): UserResponse {
    const { username, fullname, role, project, activeYn } = query;
    // If no query parameters are provided, return the full list of users
    if (!username && !fullname && !role && !project && !activeYn) {
      return {
        status: 'success',
        message: 'List of users',
        data: this.users,
      };
    }

    // If query parameters username are provided
    if (username) {
      const user = this.users.find((u) => u.username === username.trim());

      if (!user) {
        return {
          status: 'error',
          message: 'User not found',
        };
      }

      return {
        status: 'success',
        message: 'User details',
        data: user,
      };
    }

    const info: UserInput = {};

    if (fullname) {
      info.fullname = fullname.trim();
    }

    if (role) {
      info.role = role.trim();
    }

    if (project) {
      info.project = project.trim();
    }

    if (activeYn) {
      info.activeYn = activeYn.trim();
    }

    const filteredUsers = this.users.filter((u) => {
      for (const key in info) {
        // project
        if (key === 'project') {
          // if (!u.project.includes(info.project)) {
          //   return false;
          // }

          // compare each project in the user's project array
          // with the project in the query
          let found = false;
          for (const proj of u.project) {
            if (compareStringsIgnoreCase(proj, info.project)) {
              found = true;
              break;
            }
            return found;
          }
          continue;
        } else {
          return compareStringsIgnoreCase(u[key], info[key]);
        }
      }
      return true;
    });

    if (filteredUsers.length === 0) {
      return {
        status: 'error',
        message: 'User not found',
      };
    }

    return {
      status: 'success',
      message: 'User details',
      data: filteredUsers,
    };
  }

  updateUser(username: string, requestBody: UserOptional): UserResponse {
    const user = this.users.find((u) => u.username === username);

    if (!user) {
      return {
        status: 'error',
        message: 'User not found',
      };
    }

    const { fullname, role, project, activeYn } = requestBody;

    if (fullname) {
      user.fullname = fullname;
    }

    if (role) {
      user.role = role;
    }

    if (project) {
      user.project = project;
    }

    if (activeYn) {
      user.activeYn = activeYn;
    }
    // update user in the array
    const userIndex = this.users.findIndex((u) => u.username === username);
    this.users[userIndex] = user;

    return {
      status: 'success',
      message: 'User updated',
      data: user,
    };
  }

  deleteUser(username: string): UserResponse {
    const userIndex = this.users.findIndex((u) => u.username === username);
    if (userIndex === -1) {
      return {
        status: 'error',
        message: 'User not found',
      };
    }

    const user = this.users.splice(userIndex, 1);

    return {
      status: 'success',
      message: 'User deleted',
      data: user,
    };
  }

  insertUser(user: User): UserResponse {
    const { username, fullname, role, project, activeYn } = user;

    if (!username || !fullname || !role || !project || !activeYn) {
      return {
        status: 'error',
        message: 'All fields are required',
      };
    }

    const existingUser = this.users.find((u) => u.username === username);

    if (existingUser) {
      return {
        status: 'error',
        message: 'User already exists',
      };
    }

    const newUser = {
      username: username.trim(),
      fullname: fullname.trim(),
      role: role.trim(),
      project,
      activeYn: activeYn.trim(),
    };

    this.users.push(newUser);

    return {
      status: 'success',
      message: 'User added',
      data: newUser,
    };
  }
}

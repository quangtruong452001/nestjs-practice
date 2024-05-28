export interface User {
  username: string;
  fullname: string;
  role: string;
  project: string[];
  activeYn: string;
}

export interface UserOptional {
  username?: string;
  fullname?: string;
  role?: string;
  project?: string[];
  activeYn?: string;
}

export interface UserInput {
  username?: string;
  fullname?: string;
  role?: string;
  project?: string;
  activeYn?: string;
}

export interface UserResponse {
  status: string;
  message: string;
  data?: User[] | User;
}

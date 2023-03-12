export interface AuthData {
  name: string;
  username: string;
  email: string;
}

export interface AuthRO {
  user: AuthData;
}
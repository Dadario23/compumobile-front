export interface UserLogin {
  message: string;
  isAdmin: boolean;
}
export interface UserState {
  id: number;
  email: string;
  isAdmin: boolean;
  name: string;
  surname: string;
  profileImage: string;
}

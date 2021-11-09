import { User } from "./users.interface";

export interface Room {
  name: string;
  users: Array<User>
}

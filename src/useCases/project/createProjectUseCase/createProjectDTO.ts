import { User } from "../../../entities/User";

export interface ICreateProjectDTO {
  username: string;
  title: string;
  zipCode: string;
  deadline: Date;
  cost: number;
}

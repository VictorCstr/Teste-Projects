import { randomUUID } from "crypto";
import { User } from "./User";

export class Project {
  readonly id: string;
  title: string;
  zipCode: string;
  cost: number;
  done?: Boolean;
  deadline: Date;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<Project, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}

import { randomUUID } from "crypto";
import { Project } from "./Project";

export class User {
  readonly id: string;
  name: string;
  password: number;
  username: string;
  projects?: Project[];

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}

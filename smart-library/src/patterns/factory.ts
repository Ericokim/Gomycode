import { User, Student, Teacher } from "../models/user";

export type UserType = "student" | "teacher";

export class UserFactory {
  static create(type: UserType, name: string, email: string): User {
    if (type === "teacher") return new Teacher(name, email);
    return new Student(name, email);
  }
}

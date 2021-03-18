import { IRepository } from "./IRepository";
import { getRepository } from "typeorm";
import { User } from "../models";

interface IUserPayload {
  fisrtname: string;
  lastname: string;
  email: string;
  password: string;
}

export default class UserRepository implements IRepository<User, IUserPayload> {
  private userRepo: any;

  constructor() {
    this.userRepo = getRepository(User);
  }

  async getAll(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  async getSingle(id: number): Promise<User | undefined> {
    const user = await User.findOne(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await User.findOne({ email: email });
    return user;
  }

  async create(payload: IUserPayload): Promise<User> {
    const user = new User();
    user.firstName = payload.fisrtname;
    user.lastName = payload.lastname;
    user.email = payload.email;
    user.password = payload.password;
    await user.save();
    return user;
  }

  async updatePut(payload: IUserPayload): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async updatePatch(payload: IUserPayload): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async delete(payload: IUserPayload): Promise<boolean | undefined> {
    throw new Error("Method not implemented.");
  }
}

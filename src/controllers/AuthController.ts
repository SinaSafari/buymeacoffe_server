import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  IAuthController,
  IAuthFailureResponse,
  IAuthSuccessResponse,
  ILoginDTO,
  IRegisterDTO,
} from "./IAuthController";
import UserRepository from "../repositories/UserRepository";

@Route("auth")
@Tags("auth")
export default class AuthController implements IAuthController {
  @Post("/login")
  async Login(
    @Body() loginDto: ILoginDTO
  ): Promise<IAuthSuccessResponse | IAuthFailureResponse> {
    const userRepo = new UserRepository();
    const user = await userRepo.getUserByEmail(loginDto.email);

    if (!user) return { success: false, msg: "user not found" };

    const isPasswordMatch = await AuthController.verifyPassword(
      loginDto.password,
      user.password
    );

    if (!isPasswordMatch)
      return { success: false, msg: "password doesn't match" };

    const token = await AuthController.generateToken(user.email);
    return {
      success: true,
      userEmail: user.email,
      token: token,
    };
  }

  @Post("/register")
  async Register(
    @Body() registerDto: IRegisterDTO
  ): Promise<IAuthSuccessResponse | IAuthFailureResponse> {
    const userRepo = new UserRepository();
    const hashedPassword = await AuthController.hashPassword(
      registerDto.password
    );

    const user = await userRepo.create({
      fisrtname: registerDto.fisrtname,
      lastname: registerDto.lastname,
      email: registerDto.email,
      password: hashedPassword,
    });

    if (!user) throw new Error("something went wrong");

    const token = await AuthController.generateToken(user.email);

    return {
      success: true,
      userEmail: user.email,
      token: token,
    };
  }

  static async generateToken(
    // userId: number,
    userEmail: string
  ): Promise<string> {
    const secret = process.env.JWT_SECRET || "secret";
    const expiresIn = process.env.JWT_EXPIRE || "7d";
    const token = jwt.sign({ userEmail }, secret, { expiresIn });
    return token;
  }

  static async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  }

  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isVeryfied = await bcrypt.compare(plainPassword, hashedPassword);
    return isVeryfied;
  }
}

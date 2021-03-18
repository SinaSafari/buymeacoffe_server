export interface ILoginDTO {
  email: string;
  password: string;
}
export interface IRegisterDTO {
  fisrtname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IAuthFailureResponse {
  success: boolean;
  msg: string;
}

export interface IAuthSuccessResponse {
  success: boolean;
  // userId: number;
  userEmail: string;
  token: string;
}

export interface IAuthController {
  Login(
    loginDto: ILoginDTO
  ): Promise<IAuthSuccessResponse | IAuthFailureResponse>;
  Register(
    registerDto: IRegisterDTO
  ): Promise<IAuthSuccessResponse | IAuthFailureResponse>;
}

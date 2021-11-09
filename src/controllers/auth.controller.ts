import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import path from 'path';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      res.sendFile(path.join(__dirname, '/../public/views/login.html'));
      //res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      res.json({ error }).status(400);
      //next(error);
    }
  };

  public logIn = async (req: Request, res: Response) => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.sendFile(path.join(__dirname, '/../public/views/index.html'));
    } catch (error) {
      res.json({ error });
      //next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

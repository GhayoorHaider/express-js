import { NextFunction, Request, Response } from 'express';
import path from 'path';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(__dirname, '/../public/views/index.html'));
    } catch (error) {
      next(error);
    }
  };

  public login = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(__dirname, '/../public/views/login.html'));
    } catch (error) {
      next(error);
    }
  };

  public register = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(__dirname, '/../public/views/register.html'));
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;

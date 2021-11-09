import { Router } from 'express';
import { CreateRoomDto } from '@dtos/room.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import RoomController from '@controllers/room.controller';

class UsersRoute implements Routes {
  public path = '/rooms';
  public router = Router();
  public roomController = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.roomController.getRooms);
    this.router.get(`${this.path}/:id`, this.roomController.getRoomById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRoomDto, 'body'), this.roomController.createRoom);
    this.router.delete(`${this.path}/:id`, this.roomController.deleteRoom);
  }
}

export default UsersRoute;

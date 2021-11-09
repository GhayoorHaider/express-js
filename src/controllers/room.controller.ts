import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { Room } from '@interfaces/room.interface';
import roomService from '@services/room.service';

class RoomController {
  public userService = new roomService();

  public getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findRooms: Room[] = await this.userService.findAllRooms();

      res.status(200).json({ data: findRooms, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: string = req.params.id;
      const findOneUserData: Room = await this.userService.findRoomById(roomId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomData = req.body;
      const createUserData: Room = await this.userService.createRoom(roomData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: string = req.params.id;
      const deleteUserData: Room = await this.userService.deleteRoom(roomId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RoomController;

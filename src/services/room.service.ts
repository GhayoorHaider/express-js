import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { Room } from '@interfaces/room.interface';
import roomModel from '@models/room.model';
import { isEmpty } from '@utils/util';

class UserService {
  public rooms = roomModel;

  public async findAllRooms(): Promise<Room[]> {
    const rooms: Room[] = await this.rooms.find();
    return rooms;
  }

  public async findRoomById(roomId: string): Promise<Room> {
    if (isEmpty(roomId)) throw new HttpException(400, "Room id is required");

    const findRoom: Room = await this.rooms.findOne({ _id: roomId });
    if (!findRoom) throw new HttpException(409, "Room not found with id");

    return findRoom;
  }

  public async createRoom(roomData: Room): Promise<Room> {
    if (isEmpty(roomData)) throw new HttpException(400, "You're not userData");

    const findRoom: Room = await this.rooms.findOne({ name: roomData.name });
    if (findRoom) throw new HttpException(409, `Room already exists`);

    const createRoomData: Room = await this.rooms.create({ ...roomData });

    return createRoomData;
  }

  public async deleteRoom(roomId: string): Promise<Room> {
    const deleteRoomById: Room = await this.rooms.findByIdAndDelete(roomId);
    if (!deleteRoomById) throw new HttpException(409, "You're not user");

    return deleteRoomById;
  }
}

export default UserService;

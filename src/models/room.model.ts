import { model, Schema, Document } from 'mongoose';
import { Room } from '@interfaces/room.interface';

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: {
    type: String
  },
});

const roomModel = model<Room & Document>('Room', roomSchema);

export default roomModel;

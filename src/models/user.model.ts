import { Schema, model } from 'mongoose';

type UserType = {
  name: string;
  email: string;
  password: string;
  enable: boolean;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

const userSchema = new Schema<UserType>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true},
  enable: {type: Boolean, required: true, default: true},
  canCreate: {type: Boolean, default: false},
  canRead: {type: Boolean, default: true},
  canUpdate: {type: Boolean, default: false},
  canDelete: {type: Boolean, default: false},
});


const userModel = model<UserType>('User', userSchema);


export { userModel, UserType, userSchema };
import { Schema, model } from 'mongoose';

type UserType = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  enable: boolean;
  canCreateBook: boolean;
  canEditBook: boolean;
  canDeleteBook: boolean;
  canEditUser: boolean;
  canDeleteUser: boolean;
};

const userSchema = new Schema<UserType>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true},
  enable: {type: Boolean, default: true},
  canCreateBook: { type: Boolean },
  canEditBook: { type: Boolean },
  canDeleteBook: { type: Boolean },
  canEditUser: { type: Boolean },
  canDeleteUser: { type: Boolean }
});


const userModel = model<UserType>('User', userSchema);


export { userModel, UserType, userSchema };
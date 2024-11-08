import jwt from 'jsonwebtoken';
import { SECRET } from '../../config';
import { UserType } from '../../models/user.model';

export async function login(user: UserType) {
  try {
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    return { token };
  } catch (error) {
    console.error(error);
    return { error: 'Error del servidor al generar el token' };
  }
}

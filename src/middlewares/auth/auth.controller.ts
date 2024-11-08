import argon2 from 'argon2';
import { Request, Response } from 'express';
import { register } from './register.auth.action';
import { login } from './login.auth.action';
import { UserType } from '../../models/user.model';
import { userModel } from '../../models/user.model';

export async function registerUserController(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hashedPassword = await argon2.hash(password);
  const result = await register(name, email, hashedPassword);

  if (result.error) {
    res.status(409).json({ message: result.error });
  }
  res.status(201).json({ message: result.message });
}

export async function loginUserController(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }) as UserType;

  if (!user || !user.enable) {
    res.status(401).json({ message: 'Credenciales incorrectas o usuario no habilitado' });
  }

  const isValidPassword = await argon2.verify(user.password, password);
  if (!isValidPassword) {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const result = await login(user);
  if (result.error) {
    res.status(500).json({ message: result.error });
  }

  res.status(200).json({ token: result.token });
}
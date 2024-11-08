import { Router } from 'express';
import { getUserController, updateUserController, deleteUserController } from './user.controller';
import { verifyToken } from '../auth/auth.jwt';
import { permissions } from '../middlewares/permissions.middleware';

const userRoutes = Router();

userRoutes.get('/:id?', verifyToken, getUserController);
userRoutes.put('/edit/:id?', verifyToken, permissions.canEditUser, updateUserController);
userRoutes.delete('/delete/:id', verifyToken, permissions.canDeleteUser, deleteUserController);


export default userRoutes;
import { Router } from 'express';
import { getUserController, updateUserController, deleteUserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth/auth.jwt';

const userRoutes = Router();

userRoutes.get('/:id?', verifyToken, getUserController);
userRoutes.put('/edit/:id?', verifyToken, updateUserController);
userRoutes.delete('/delete/:id', verifyToken, deleteUserController);


export default userRoutes;
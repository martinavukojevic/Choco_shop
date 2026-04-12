import express from 'express';
import userAuth from '../middleware/auth.js'
import { loginUser, registerUser,adminLogin,getAllUsers, deleteUser, aboutUser, updateUser } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/list', getAllUsers)
userRouter.post('/delete',deleteUser)
userRouter.get('/about-user', authUser, aboutUser);
userRouter.put('/update', userAuth, updateUser);

export default userRouter;




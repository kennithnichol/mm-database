import express from 'express'
import { middleware } from '../../../../../shared/infra/http';
import { createUserController } from '../../../useCases/createUser';
import { getCurrentUserController } from '../../../useCases/getCurrentUser';
import { getUserByUserName, getUserByUserNameController } from '../../../useCases/getUserByUserName';

const userRouter = express.Router();

userRouter.post('/',
	(req, res) => createUserController.execute(req,res)
);

userRouter.get('/me',
	middleware.ensureAuthenticated(),
	(req, res) => getCurrentUserController.execute(req, res)
)

userRouter.get('/:username',
	middleware.ensureAuthenticated(),
	(req, res) => getUserByUserNameController.execute(req, res)
)

export { userRouter };
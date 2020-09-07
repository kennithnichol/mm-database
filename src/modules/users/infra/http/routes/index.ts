import express from 'express'

const userRouter = express.Router();

userRouter.post('/',
	(req, res) => res.json({})
);

export { userRouter };
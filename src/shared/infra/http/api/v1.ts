import express from 'express'
import { userRouter } from '../../../../modules/users/infra/http/routes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
    return res.json({ message: 'System is running' });
})

v1Router.use('/users', userRouter);

export { v1Router }
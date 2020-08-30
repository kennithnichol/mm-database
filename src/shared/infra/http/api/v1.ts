import express from 'express'

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
    return res.json({ message: 'System is running' });
})

export { v1Router }
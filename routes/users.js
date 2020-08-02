const usersRouter = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');
const { userIdValidation } = require('../middlewares/user-validation');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', userIdValidation, getUserById);

module.exports = usersRouter;

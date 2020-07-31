const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isImageUrl = require('is-image-url');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../error/bad-request');
const Unauthorized = require('/error/unauthorized');

module.exports = {
  login(req, res, next) {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password)
      .then((user) => {
        res.send({
          // eslint-disable-next-line no-underscore-dangle
          token: jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),

        });
      })
      .catch((error) => {
        //res.status(401).send({ message: `${error.message} ошибка в login` });
        throw new Unauthorized(`${error.message}`);//не знаю что написать сюда!!-----------------
      })

  },
  // eslint-disable-next-line consistent-return
  createUser(req, res, next) {
    const {
      name, about, avatar, email,
    } = req.body;

    if (!validator.isEmail(email)) {
      throw new BadRequest('Не правильный формат почты');
    }

    const { password } = req.body;
    const regex = /^[a-zA-Z0-9_-]{6,15}$/;
    const checkPass = regex.test(password.trim());
    if (!checkPass) {
      throw new BadRequest('Слишком короткий пароль! Длинна пароля должна составлять от 6 символов');
    }

    if (!isImageUrl(avatar)) {
      throw new BadRequest('Не правильный url аватара');
    }

    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.status(201).send({ data: user, message: 'Вы создались!' }))
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        if (error.name === 'ValidationError') {
          if (error.errors.email && error.errors.email.kind === 'unique') {
            return res.status(409).send({ error: error.errors.email.properties.message });
          }
          return res.status(400).send({ error: error.message });
        }
        next(error);
      });
  },
};

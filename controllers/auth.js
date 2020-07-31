const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Unauthorized = require('../error/unauthorized');

module.exports = {
  login(req, res) {
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

    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.status(201).send({ data: name,about,avatar,email, message: 'Вы создались!' }))
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        if (error.name === 'ValidationError') {
          if (error.errors.email && error.errors.email.kind === 'unique') {
            return res.status(409).send({ error: error.errors.email.properties.message });
          }
          return res.status(400).send({ error: error.message });
        }
      });
  },
};

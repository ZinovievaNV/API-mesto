const User = require('../models/user');
const NotFoundError = require('../error/not-found-err');//404 код

module.exports = {
  getUsers(req, res, next) {
    User.find({})
      .then((user) => res.send({data: user}))
      .catch(next);
  },

  getUserById(req, res, next) {
    User.findById(req.params.userId)

      .then((user) => {
        if (!user) {
          throw new NotFoundError('Нет пользователя с таким id')
        }
        res.send({data: user})
        })
      .catch((error)=>{
        console.log(error);
      })
      .catch(next);

  },

};

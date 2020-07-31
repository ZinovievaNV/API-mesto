/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const NoAccessRights = require('../error/no-access-rights');// нет прав доступа 403

module.exports = {
  getCards(req, res, next) {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((card) => res.send({ data: card }))
      .catch(next);
  },
  createCard(req, res, next) {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.send({ data: card }))
      .catch(next);
  },

  deleteCardById(req, res, next) {
    Card.findById({ _id: req.params.cardId })
      //.orFail(() => Error('Карточка не найдена'))
      // eslint-disable-next-line consistent-return
      .then((card) => {
        if (!(card.owner.toString() === req.user._id.toString())) {
          throw new NoAccessRights('это не Ваша карта, её нельзя удалить!');
        }
        Card.deleteOne({ _id: card._id })
          .then(() => {
            res.send({ message: 'Карточка удалена' });
          })
          .catch(next);
      })
      .catch(next);
  },

};

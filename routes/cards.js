const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCardById } = require('../controllers/cards');
const { cardIdValidationId, cardValidation } = require('../middlewares/card-validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', cardValidation, createCard);
cardsRouter.delete('/:cardId', cardIdValidationId, deleteCardById);

module.exports = cardsRouter;

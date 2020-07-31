const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const urlValidation = require('./url-validate');

const message = {
  name: {
    'string.empty': 'Поле `name` не может быть пустым',
    'string.min': 'Поле `name` не может быть меньше 2 символов',
    'string.max': 'Поле `name` не может быть больше 30 символов',
    'any.required': 'Отсутствует обязательное поле `name`',
  },
  link: {
    'string.empty': 'Поле `link` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `link`',
  },
};

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(message.name),
    link: Joi.string().required().custom(urlValidation, 'url validation').messages(message.link),
  }),
});

const cardIdValidationId = celebrate({
  params: Joi.object({
    cardId: Joi.objectId().message('`cardId` не может быть меньше 24 символов'),
  }),
});

module.exports = { cardValidation, cardIdValidationId };
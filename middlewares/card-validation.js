const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const urlValidation = require('./url-validate');

const messages = {
  name: {
    'string.empty': 'Поле name не может быть пустым',
    'string.min': 'Поле name должно быть не меньше 2 символов',
    'string.max': 'Поле name должно быть не больше 30 символов',
    'any.required': 'Поле name обязательно',
  },
  link: {
    'string.empty': 'Поле link не может быть пустым',
    'any.required': 'Поле link обязательно',
  },
};

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .prefs({
        messages: messages.name,
      }),
    link: Joi.string()
      .required()
      .custom(urlValidation, 'url validation')
      .prefs({
        messages: messages.link,
      }),
  }),
});

const cardIdValidationId = celebrate({
  params: Joi.object({
    cardId: Joi.objectId().message('Поле cardId должно быть не меньше 24 символов'),
  }),
});

module.exports = { cardValidation, cardIdValidationId };

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
  about: {
    'string.empty': 'Поле about не может быть пустым',
    'string.min': 'Поле about должно быть не меньше 2 символов',
    'string.max': 'Поле about должно быть не больше 30 символов',
    'any.required': 'Поле about обязательно',
  },
  avatar: {
    'string.empty': 'Поле avatar не может быть пустым',
    'any.required': 'Поле avatar обязательно',
  },
  email: {
    'string.empty': 'Поле email не может быть пустым',
    'string.email': 'Неверный формат поля email',
    'any.required': 'Поле email обязательно',
  },
  password: {
    'string.empty': 'Поле password не может быть пустым',
    'string.min': 'Поле password должно быть не меньше 8 символов',
    'string.pattern.base': 'Пароль может содержать только заглавные и прописные буквы латинского алфавита, цифры и служебные символы @*#-_%|',
    'any.required': 'Поле password обязательно',
  },
};

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .prefs({
        messages: messages.name,
      }),
    about: Joi.string()
      .required()
      .min(2)
      .max(30)
      .prefs({
        messages: messages.about,
      }),
    avatar: Joi.string()
      .required()
      .custom(urlValidation, 'url validation')
      .prefs({
        messages: messages.avatar,
      }),
    email: Joi.string()
      .required()
      .email()
      .prefs({
        messages: messages.email,
      }),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^([a-zA-Z0-9@*#-_%|]{8,15})$/)
      .prefs({
        messages: messages.password,
      }),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .prefs({
        messages: messages.email,
      }),
    password: Joi.string()
      .required()
      .min(8)
      .prefs({
        messages: messages.password,
      }),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.objectId().message('Поле userId должно быть не больше 24 символов'),
  }),
});

module.exports = {
  createUserValidation,
  userIdValidation,
  loginUserValidation,
};

const { isURL } = require('validator');

module.exports = (value, helpers) => {
  if (!isURL(value)) {
    // eslint-disable-next-line no-useless-escape
    return helpers.message(`Некорректный формат поля ${helpers.state.path}`);
  }
  return value;
};

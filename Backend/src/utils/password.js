const bcrypt = require('bcrypt');

const saltRounds = 10;

const hash_password = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const compare_password = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};

module.exports = {
  hash_password,
  compare_password
}

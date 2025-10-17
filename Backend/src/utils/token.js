const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secreto-jwt';

const sign_token = (userId) => {
  return jwt.sign(
    {
      "user": userId,
    },
    JWT_SECRET,
    {
      expiresIn: '2h',
    })
};

module.exports = {
  sign_token,
}

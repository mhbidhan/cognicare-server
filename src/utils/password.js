const bcrypt = require('bcryptjs');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function checkPassword(password, encryptedPassword) {
  return await bcrypt.compare(password, encryptedPassword);
}

module.exports = {
  encryptPassword,
  checkPassword,
};

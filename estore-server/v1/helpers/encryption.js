const bcrypt = require("bcryptjs");

function encrypt(text) {
  if (!text) return;
  try {
    return bcrypt.hashSync(text);
  } catch (e) {
    console.log(e);
  }
  return undefined;
}

function compare(text, hash) {
  try {
    return bcrypt.compareSync(text, hash);
  } catch (e) {
    console.log(e);
  }
  return false;
}

module.exports = { encrypt, compare };

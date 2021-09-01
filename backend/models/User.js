const bcrypt = require('bcryptjs');

class User {
  constructor({ name, email }) {
    this._data = {
      name,
      email,
    };
  }

  getData() {
    return Object.assign({}, this._data);
  }

  setId(id) {
    this._data.id = id;
  }

  setPassword(password) {
    this._data.password = bcrypt.hashSync(password, 10);
  }

  setToken(token) {
    this._data.token = token;
  }

  setRefreshToken(token) {
    this._data.refreshToken = token;
  }

  setHashedPasswordFromStorage(password) {
    this._data.password = password;
  }

  comparePassword(password) {
    return bcrypt.compareSync(password, this._data.password);
  }

  getDataForStorage() {
    const dataCopy = Object.assign({}, this._data);
    return dataCopy;
  }
}

module.exports = User;

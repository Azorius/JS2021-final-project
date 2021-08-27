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

  comparePassword(password) {
    return bcrypt.compareSync(password, this._data.password);
  }

  getDataForStorage() {
    const dataCopy = Object.assign({}, this._data);
    return dataCopy;
  }
}

module.exports = User;

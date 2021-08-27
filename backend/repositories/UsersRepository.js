const { User } = require('../models');
const DbStorage = require('../storages/DbStorage');

class UsersRepository {
  constructor() {
    this._storage = new DbStorage('users');
  }

  async getOne(filter) {
    const user = await this._storage.getOne(filter);
    if (!user) {
      return null;
    }

    const userModel = new User(user);
    userModel.setId(user.id);
    return userModel.getData();
  }

  async create({ name, email, password }) {
    const userModel = new User({ name, email });
    userModel.setPassword(password);
    const dataToStore = userModel.getDataForStorage();

    const { id } = await this._storage.create(dataToStore);
    userModel.setId(id);
    return userModel.getData();
  }
}

module.exports = new UsersRepository();

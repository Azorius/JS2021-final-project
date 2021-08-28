const { User } = require('../models');
const DbStorage = require('../storages/DbStorage');

class UsersRepository {
  constructor() {
    this._storage = new DbStorage('users');
  }

  async getOne(filter) {
    try {
      const user = await this._storage.getOne(filter);
      if (!user) {
        return null;
      }
  
      const userModel = new User(user);
      userModel.setId(user.id);
      return userModel.getData();      
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);      
    }
  }

  async authenticateLogin(email, password) {
    try {
      const user = await this._storage.getOne({ email });
      if (!user) {
        return null;
      }
  
      const userModel = new User(user);
      userModel.setHashedPasswordFromStorage(user.password);
      if (userModel.comparePassword(password)) {
        userModel.setId(user.id);
        return userModel.getData();
      }
      return null;
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);      
    }
  }

  async updateById(id, update) {
    try {
      await this._storage.update(id, update);
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);      
    }
  }

  async create({ name, email, password }) {
    try {
      const userModel = new User({ name, email });
      userModel.setPassword(password);
      const dataToStore = userModel.getDataForStorage();
  
      const { id } = await this._storage.create(dataToStore);
      userModel.setId(id);
      return userModel.getData();
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);      
    }
  }
}

module.exports = new UsersRepository();

const pool = require('./db');

class DbStorage {
  constructor(tableName) {
    this._table = tableName;
  }
  async getAll() {
    const [rows] = await pool.promise().execute(`SELECT * FROM ${this._table}`);
    return rows;
  }
  async getFiltered(filter) {
    const field = Object.entries(filter)[0];
    const [rows] = await pool.promise().execute(`SELECT * FROM ${this._table} WHERE ${field[0]} = ?`, [field[1]]);
    return rows;
  }
  async getById(id) {
    const [rows] = await pool
      .promise()
      .execute(`SELECT * FROM ${this._table} WHERE id = ?`, [id]);
    return rows[0];
  }
  async getOne(filter) {
    const field = Object.entries(filter)[0];
    const [rows] = await pool
      .promise()
      .execute(
        `SELECT * FROM ${this._table} WHERE ${field[0]} = '${field[1]}'`
      );
    return rows[0];
  }
  async create(data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    let dataLength = values.length - 1;
    let valuesPlaceholder = '?';
    while (dataLength) {
      valuesPlaceholder += ', ?';
      dataLength -= 1;
    }

    const [meta] = await pool
      .promise()
      .execute(`INSERT INTO ${this._table} (${fields}) VALUES (${valuesPlaceholder})`, values);

    return Object.assign({}, data, { id: meta.insertId });
  }
  async update(id, data) {
    if (!id) throw new Error(`Missing "id" in data for DbStorage.update`);

    const fields = Object.keys(data).join('=?,') + '=?';
    const values = Object.values(data);

    await pool
      .promise()
      .execute(
        `UPDATE ${this._table} SET ${fields} WHERE id =?`,
        [...values, id]
      );
    return data;
  }
}

module.exports = DbStorage;

const pool = require('./db');

class DbStorage {
  constructor(tableName) {
    this._table = tableName;
  }
  async getAll() {
    const [rows] = await pool.promise().execute(`SELECT * FROM ${this._table}`);
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
    const values = Object.values(data).reduce((values, value, idx, arr) => {
      if (arr[idx + 1]) return (values += `'${value}', `);
      return (values += `'${value}'`);
    }, '');

    const [meta] = await pool
      .promise()
      .execute(
        `INSERT INTO ${this._table} (${fields.join(', ')}) VALUES (${values})`
      );

    return Object.assign({}, data, { id: meta.insertId });
  }
}

module.exports = DbStorage;

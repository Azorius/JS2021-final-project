const pool = require("./db");

class DbStorage {
  constructor(tableName) {
    this._table = tableName;
  }
  async getAll() {
    const [rows] = await pool.promise().execute(`SELECT * FROM ${this._table}`);
    return rows;
  }
  async create(data) {
    const fields = Object.keys(data);
    console.log(fields);
    const values = Object.values(data).reduce((values, value, idx, arr) => {
      if (arr[idx+1]) return values += `'${value}', `;
      return values += `'${value}'`;
    }, "");
    console.log(values);

    const [meta] = await pool
      .promise()
      .execute(
        `INSERT INTO ${this._table} (${fields.join(', ')}) VALUES (${values})`
      );

    return Object.assign({}, data, { id: meta.insertId });
  }
}

module.exports = DbStorage;

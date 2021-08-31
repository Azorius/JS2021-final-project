const pool = require('./db');

const foreignKeysStatement = `
  SELECT
    column_name,
    referenced_table_schema AS foreign_db, 
    referenced_table_name AS foreign_table, 
    referenced_column_name  AS foreign_column 
  FROM
    information_schema.KEY_COLUMN_USAGE
  WHERE
    constraint_schema = SCHEMA()
  AND
    table_schema = DATABASE()
  AND
    referenced_column_name IS NOT NULL
  ORDER BY
    column_name;
`;

class DbStorage {
  constructor(tableName) {
    this._table = tableName;
  }
  async getAll(query) {
    try {
      let [rows] = await pool.promise().execute(foreignKeysStatement);
      [rows] = await pool.promise().execute(`
        SELECT * 
        FROM ${this._table} 
        JOIN ${rows[0].foreign_table} 
        ON ${this._table}.${rows[0].column_name} = ${rows[0].foreign_table}.${rows[0].foreign_column}
        ${query
          ? `${query.startWith ? `WHERE id_${this._table} >= ${query.startWith}` : ''}
            ${query.limit ? `ORDER BY id_${this._table} ASC LIMIT ${query.limit}` : ''}` 
          : ''}
      `);
      return rows;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getFiltered(filter, query) {
    try {
      const field = Object.entries(filter)[0];
      let [rows] = await pool.promise().execute(foreignKeysStatement);
      [rows] = await pool.promise().execute(
        `
        SELECT * 
        FROM ${this._table} 
        JOIN ${rows[0].foreign_table} 
        ON ${this._table}.${rows[0].column_name} = ${rows[0].foreign_table}.${rows[0].foreign_column} 
        WHERE ${field[0]} = ?
        ${query
          ? `${query.startWith ? `AND id_${this._table} >= ${query.startWith}` : ''}
            ${query.limit ? `ORDER BY id_${this._table} ASC LIMIT ${query.limit}` : ''}` 
          : ''}`,
        [field[1]]
      );
      return rows;      
    } catch (e) {
      throw new Error(e);      
    }
  }
  async getById(id) {
    try {
      let [rows] = await pool.promise().execute(foreignKeysStatement);
      [rows] = await pool.promise().execute(
        `
        SELECT * 
        FROM ${this._table} 
        JOIN ${rows[0].foreign_table} 
        ON ${this._table}.${rows[0].column_name} = ${rows[0].foreign_table}.${rows[0].foreign_column}
        WHERE id_${this._table} = ?`,
        [id]
      );
      return rows[0];
    } catch (e) {
      throw new Error(e);      
    }
  }
  async getOne(filter) {
    try {
      const field = Object.entries(filter)[0];
      const [rows] = await pool
        .promise()
        .execute(
          `SELECT * FROM ${this._table} WHERE ${field[0]} = '${field[1]}'`
        );
      return rows[0];
    } catch (e) {
      throw new Error(e);      
    }
  }
  async create(data) {
    try {
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
        .execute(
          `INSERT INTO ${this._table} (${fields}) VALUES (${valuesPlaceholder})`,
          values
        );
  
      return Object.assign({}, data, { [`id_${this._table}`]: meta.insertId });
    } catch (e) {
      throw new Error(e);      
    }
  }
  async update(id, data) {
    if (!id) throw new Error(`Missing "id" in data for DbStorage.update`);
    try {
      const fields = Object.keys(data).join('=?,') + '=?';
      const values = Object.values(data);
  
      await pool
        .promise()
        .execute(
          `UPDATE ${this._table} SET ${fields} WHERE id_${this._table} =?`,
          [...values, id]
        );
      return data;
    } catch (e) {
      throw new Error(e);      
    }
  }
  async remove(id) {
    if (!id) throw new Error(`Missing "id" in data for DbStorage.update`);
    try {
      await pool.promise().execute(`DELETE FROM ${this._table} WHERE id_${this._table} =?`, [id])
    } catch (e) {
      throw new Error(e);      
    }
  }
}

module.exports = DbStorage;

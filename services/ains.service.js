const boom = require('@hapi/boom');
const { getConnection, directQuery } = require('../sybase');

class AinsService {
  constructor() {
    this.ains = directQuery();
  }

  async find() {
    const db = await getConnection();
    var ains = await db.queryAsync('SELECT arains FROM ivr_db.dbo.am_ains');
    db.disconnect();
    return ains;
  }

  async findOne(id) {
    const db = await getConnection();
    var ains = await db.queryAsync('SELECT arains FROM ivr_db.dbo.am_ains');
    const res = ains.find((item) => item.arains === id);
    db.disconnect();
    if (!res) throw boom.notFound('Ains not found');
    return res;
  }

  async create(data) {
    const db = await getConnection();
    var ains = await db.queryAsync('SELECT arains FROM ivr_db.dbo.am_ains');
    if (ains.find((item) => item.arains == data.arains)) {
      db.disconnect();
      throw boom.conflict('Ains duplicate');
    }
    await db.queryAsync(
      `INSERT INTO ivr_db.dbo.am_ains (arains) VALUES(${data.arains})`
    );
    db.disconnect();
    return data;
  }

  async update(id, changes) {
    const db = await getConnection();
    var ains = await db.queryAsync('SELECT arains FROM ivr_db.dbo.am_ains');
    if (!ains.find((item) => item.arains == id)) {
      db.disconnect();
      throw boom.notFound('Ains not found');
    }
    if (ains.find((item) => item.arains == changes.arains)) {
      db.disconnect();
      throw boom.conflict('Ains duplicate');
    }
    await db.queryAsync(
      `UPDATE ivr_db.dbo.am_ains SET arains = ${changes.arains}  WHERE arains = ${id}`
    );
    db.disconnect();
    return changes;
  }

  async delete(id) {
    const db = await getConnection();
    var ains = await db.queryAsync('SELECT arains FROM ivr_db.dbo.am_ains');
    if (!ains.find((item) => item.arains == id)) {
      db.disconnect();
      throw boom.notFound('Ains not found');
    }
    await db.queryAsync(`DELETE FROM ivr_db.dbo.am_ains WHERE arains=${id}`);
    db.disconnect();
    return { message: 'Ains deleted', arains: id };
  }
}

module.exports = AinsService;

const Sybase = require('ciapetro-sybase');

async function getConnection() {
  const db = new Sybase(
    'nahuel.dinfo.ufro.cl',
    5020,
    'ivr_db',
    'UsuaVrac',
    'frovrac'
  );

  await db.connect();
  return db;
}

async function directQuery() {
  const db = new Sybase(
    'nahuel.dinfo.ufro.cl',
    5020,
    'ivr_db',
    'UsuaVrac',
    'frovrac'
  );

  await db.connect();
  const res = await db.queryAsync('SELECT arains FROM ivr_db.dbo.am_ains');
  db.disconnect();
  return res;
}

module.exports = { getConnection, directQuery };

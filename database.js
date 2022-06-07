var Sybase = require('sybase'),
  db = new Sybase(
    'nahuel.dinfo.ufro.cl',
    5020,
    'ivr_db',
    'UsuaVrac',
    'frovrac'
  );

db.connect(function (err) {
  if (err) return console.log(err);

  db.query('SELECT arains FROM ivr_db.dbo.am_ains', function (err, data) {
    if (err) console.log(err);

    console.log(data);

    db.disconnect();
  });
});

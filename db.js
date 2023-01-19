const Sequelize = require('sequelize');
const sequelize = new Sequelize('wt22', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nastavnici = require('./models/nastavnici.js')(sequelize)
db.predmeti = require('./models/predmeti.js')(sequelize)
db.prisustva = require('./models/prisustva.js')(sequelize)
db.studenti = require('./models/studenti.js')(sequelize)
db.predmeti.hasMany(db.prisustva, {as: 'PrisustvoNaPredmetu'})
db.prisustva.belongsTo(db.predmeti)

db.nastavnici.hasMany(db.predmeti, {as: 'PredmetiNastavnika'})
db.predmeti.belongsTo(db.nastavnici)

db.studenti.hasMany(db.prisustva, {
    //foreignKey: "index",
    //sourceKey: "index",
    as: "PrisustvoStudenta"
})
db.prisustva.belongsTo(db.studenti)

 module.exports = db;
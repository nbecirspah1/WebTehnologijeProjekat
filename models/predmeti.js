const Sequelize = require("sequelize");
const sequelize = require("../db.js");
module.exports = function (sequelize, DataTypes){
    const Predmeti = sequelize.define('predmeti', {
        // predmetiId: {
        //     type: sequelize.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     field: 'ID'
        // },
        predmet: {
            type: Sequelize.STRING,
            field: 'predmet'
        },
        brojPredavanjaSedmicno: {
            type: Sequelize.INTEGER,
            field: 'brojPredavanjaSedmicno'
        },
        brojVjezbiSedmicno: {
            type: Sequelize.INTEGER,
            field: 'brojVjezbiSedmicno'
        }
    },
    {
        timestamps: false
    });
    return Predmeti;
    
}

const Sequelize = require("sequelize");
const sequelize = require("../db.js");
module.exports = function (sequelize, DataTypes){
    const Studenti = sequelize.define('studenti', {
        ime: {
            type: Sequelize.STRING,
            field: 'ime'
        },
        indeks: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            field: 'indeks'
        }
    
    },
)
    
    return Studenti;
    
}

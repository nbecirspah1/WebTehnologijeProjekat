const Sequelize = require("sequelize");
const sequelize = require("../db.js");
module.exports = function (sequelize, DataTypes){
    const Prisustva = sequelize.define('prisustva', {
        sedmica: {
            type: Sequelize.INTEGER,
            field: 'sedmica'
        },
        predavanja: {
            type: Sequelize.INTEGER,
            field: 'predavanja'
        },
        vjezbe: {
            type: Sequelize.INTEGER,
            field: 'vjezbe'
         }//,    
        // indeks: {
        //     type: Sequelize.INTEGER,
        //     field: 'indeks'
        //  }
        // predmetiId: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //         model: 'predmeti',
        //         key: 'predmetiId'
        //     },
        //     field: predmetiId   
        // }
    })
    
    
    return Prisustva;
    
}

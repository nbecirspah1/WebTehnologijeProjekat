const Sequelize = require("sequelize");
const sequelize = require("../db.js");
module.exports = function (sequelize, DataTypes){
    const Nastavnici = sequelize.define('nastavnici', {
        // nastavnikId: {
        //     type: sequelize.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        username: {
            type: Sequelize.STRING,
            // validate: {
            //     is: ["[a-z]", 'i'], // regex koji dozvoljava samo slova
            //     isIn: {
            //         args: [
            //             ['ba', 'en']
            //         ],
            //         msg: "Treba biti bosanski ili engleski"
            //     }
            // },
            field: 'username'
        },
    
        password_hash: {
            type: Sequelize.STRING,
            field: 'password_hash'
        }
    },
    {
        timestamps: false
    })
    
    
    
    return Nastavnici;
    
}

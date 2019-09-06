const Sequelize = require('sequelize');
const item = require("./item.model")
console.log(process.env.DB_CONNECTION)
const sequelize = new Sequelize('twitter', 'root', 'Elik0s1!', {
    host: process.env.DB_CONNECTION,
    dialect: 'mysql'
});

const itemModel = item.defineModel(Sequelize, sequelize);
sequelize.sync({ force: false })



module.exports = {
    item: itemModel
}
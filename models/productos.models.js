module.exports = (sequelize, DataTypes) => {
    return sequelize.define('productos', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true 
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
}
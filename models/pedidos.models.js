module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pedidos', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true 
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Procesado'
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        formaDePago: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}
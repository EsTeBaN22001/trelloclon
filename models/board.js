import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
  class Board extends Model {}
  Board.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      backgroundColor: {
        type: DataTypes.STRING(30)
      }
    },
    {
      sequelize,
      modelName: 'Board',
      tableName: 'board',
      timestamps: false
    }
  )
  return Board
}

import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
  class List extends Model {}
  List.init(
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
      position: {
        type: DataTypes.INTEGER
      },
      boardId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'board',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'List',
      tableName: 'list',
      timestamps: false
    }
  )
  return List
}

import { Model, DataTypes } from 'sequelize'
export default function (sequelize) {
  class UserBoards extends Model {}
  UserBoards.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      boardId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'board',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'UserBoards',
      tableName: 'userboards',
      timestamps: false
    }
  )
  return UserBoards
}

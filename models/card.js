import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
  class Card extends Model {}
  Card.init(
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
      description: {
        type: DataTypes.TEXT
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'list',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'Card',
      tableName: 'card',
      timestamps: false
    }
  )
  return Card
}

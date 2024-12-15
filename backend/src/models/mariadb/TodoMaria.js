const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mariadb');
const { TodoSchema } = require('../interfaces/TodoSchema');

const convertToSequelizeSchema = (schema) => {
  const sequelizeSchema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  };
  
  Object.entries(schema).forEach(([key, value]) => {
    if (key === 'timestamps') return;

    if (value.type === String) {
      sequelizeSchema[key] = {
        type: value.values ? DataTypes.ENUM(...value.values) : DataTypes.STRING,
        allowNull: !value.required,
        defaultValue: value.default
      };
    } else if (value.type === Date) {
      sequelizeSchema[key] = {
        type: DataTypes.DATE,  // DATE 타입 사용
        allowNull: !value.required,
        defaultValue: value.default,
        get() {  // getter 추가
          return this.getDataValue(key) 
            ? new Date(this.getDataValue(key)).toISOString()
            : null;
        }
      };
    }
  });

  return sequelizeSchema;
};

const Todo = sequelize.define(
  'Todo',
  convertToSequelizeSchema(TodoSchema),
  {
    tableName: 'todos',
    timestamps: true,
    createdAt: true,
    updatedAt: true
  }
);

module.exports = Todo; 
import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const Address = sequelize.define(
  'addresses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    abbreviation: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Address.belongsTo(User, {
    as: 'user',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idUser',
        allowNull:false,
        field: 'id_user'
    }
})

export default Address;
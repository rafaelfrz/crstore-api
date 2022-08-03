import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const Status = sequelize.define(
  'order_status',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Status;

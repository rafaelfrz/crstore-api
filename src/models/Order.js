import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Payment from "./Payment";
import User from "./User";

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Order.belongsTo(Payment, {
    as: 'payment',
    foreignKey: {
        name: 'idPayment',
        allowNull: false,
        field: 'id_payment'
    }
}),

Order.belongsTo(User, {
    as: 'user',
    foreignKey: {
        name: 'idUser',
        allowNull: false,
        field: 'id_user'
    }
    })

export default Order;
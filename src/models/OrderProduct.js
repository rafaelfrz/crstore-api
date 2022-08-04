import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Order from "./Order";
import Product from "./Product";

const OrderProduct = sequelize.define(
  'order_product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: { 
      type: DataTypes.NUMERIC(15,2),
      allowNull: false
    },
    total: {
      type: DataTypes.NUMERIC(15,2),
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

Order.belongsToMany(Product, { 
  through: OrderProduct,
  as: 'products',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idOrder',
    allowNull: false,
    field: 'id_order'
  } 
});

Product.belongsToMany(Order, { 
  through: OrderProduct,
  as: 'orders',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idProduct',
    allowNull: false,
    field: 'id_product'
  }
});

export default OrderProduct;
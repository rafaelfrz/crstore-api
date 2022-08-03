import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const Discount = sequelize.define(
  'discounts',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    discountType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    period: {
      type: DataTypes.DATE,
      allowNull: false
    },
    uses: {
      type: DataTypes.INTEGER,
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

export default Discount;
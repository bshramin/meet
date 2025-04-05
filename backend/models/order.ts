import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

export interface OrderAttributes {
  id: string;
  merchantId: string;
  status: string;
  totalAmountUsd: number;
  totalAmountEth: number;
  ethPrice: number;
  emailAddress: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes
  extends Optional<OrderAttributes, "id" | "updatedAt"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  declare id: string;
  declare merchantId: string;
  declare status: string;
  declare totalAmountUsd: number;
  declare totalAmountEth: number;
  declare ethPrice: number;
  declare emailAddress: string;

  // Timestamps managed by Sequelize
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(models: any) {
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId", // maps to "order_id" in the database
      as: "orderItems",
    });
  }
}

export default (sequelize: Sequelize): typeof Order => {
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      merchantId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "merchant_id",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmountUsd: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "total_amount_usd",
      },
      totalAmountEth: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "total_amount_eth",
      },
      ethPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "eth_price",
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "email_address",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true, // Sequelize automatically adds createdAt and updatedAt
      underscored: true, // Uses snake_case for auto-generated fields (created_at, updated_at)
    }
  );
  return Order;
};

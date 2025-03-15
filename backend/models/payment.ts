import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

export interface PaymentAttributes {
  id: string;
  contractAddress: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex?: number;
  payer: string;
  amount: string;
  orderId: string;
  recipient?: string;
  recipientAmount?: string;
  owner?: string;
  ownerAmount?: string;
  merchantPercentage?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// When creating a new Payment instance, some fields are optional.
interface PaymentCreationAttributes
  extends Optional<
    PaymentAttributes,
    | "id"
    | "logIndex"
    | "recipient"
    | "recipientAmount"
    | "owner"
    | "ownerAmount"
    | "merchantPercentage"
    | "createdAt"
    | "updatedAt"
  > {}

export class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  declare id: string;
  declare contractAddress: string;
  declare blockNumber: number;
  declare transactionHash: string;
  declare transactionIndex: number;
  declare blockHash: string;
  declare logIndex?: number;
  declare payer: string;
  declare amount: string;
  declare orderId: string;
  declare recipient?: string;
  declare recipientAmount?: string;
  declare owner?: string;
  declare ownerAmount?: string;
  declare merchantPercentage?: number;

  // timestamps provided by Sequelize
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize): typeof Payment => {
  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      contractAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "contract_address",
      },
      blockNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "block_number",
      },
      transactionHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "transaction_hash",
      },
      transactionIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "transaction_index",
      },
      blockHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "block_hash",
      },
      logIndex: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "log_index",
      },
      payer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "order_id",
      },
      recipient: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recipientAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: "recipient_amount",
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ownerAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: "owner_amount",
      },
      merchantPercentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "merchant_percentage",
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
      timestamps: true, // enable Sequelize timestamps (createdAt, updatedAt)
      underscored: true, // maps auto-generated timestamp columns to snake_case (created_at, updated_at)
    }
  );
  return Payment;
};

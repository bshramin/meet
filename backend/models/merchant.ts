import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface MerchantAttributes {
  id: string;
  name: string;
  wallet: string;
  percentage: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MerchantCreationAttributes
  extends Optional<MerchantAttributes, "id" | "createdAt" | "updatedAt"> {}

class Merchant
  extends Model<MerchantAttributes, MerchantCreationAttributes>
  implements MerchantAttributes
{
  declare id: string;
  declare name: string;
  declare wallet: string;
  declare percentage: number;
  declare email: string;

  // Sequelize timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize): typeof Merchant => {
  Merchant.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wallet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Merchant",
      tableName: "merchants",
      timestamps: true, // auto-manage createdAt & updatedAt
      underscored: true, // maps auto-generated timestamp fields to snake_case in DB (created_at, updated_at)
    }
  );
  return Merchant;
};

import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

// 1. Define the interface with camelCased keys.
interface ProductAttributes {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  merchantId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the creation attributes (making 'id' optional).
type ProductCreationAttributes = Optional<ProductAttributes, "id">;

// 3. Extend the Model class with our attribute interfaces.
export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  declare id: string;
  declare name?: string;
  declare description?: string;
  declare price?: number;
  declare merchantId?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Define associations if needed.
  static associate(models: any) {
    // e.g., Product.hasMany(models.Order, { foreignKey: 'productId' });
  }
}

// 4. Initialize the model and enable timestamps.
export default (sequelize: Sequelize): typeof Product => {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      merchantId: {
        type: DataTypes.UUID,
        // If your DB column name is snake_case (i.e. "merchant_id") but you want camelCase in your model,
        // you can map it using the field property:
        field: "merchant_id",
      },
      // Note: createdAt and updatedAt are added automatically.
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true, // Enable Sequelize to automatically add and manage createdAt/updatedAt
      underscored: true, // maps auto-generated timestamp fields to snake_case in DB (created_at, updated_at)
    }
  );
  return Product;
};

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASS, // Password
  {
    host: process.env.DB_HOST, // Host (localhost or remote)
    port: process.env.DB_PORT, // Port (default is 5432)
    dialect: "postgres",
    logging: false, // Disable logging
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");

    // Sync database and alter tables if needed
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized");
  } catch (error) {
    console.error("❌ Error connecting to PostgreSQL:", error.message);
    process.exit(1);
  }
};

export default sequelize;
export { connectDB };

import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DATABASE_NAME || "postgrestest_igru";

const config = {
  development: {
    client: "pg",
    connection: {
      host:
        process.env.DB_HOST ||
        "dpg-d0phsi3e5dus73drfhp0-a.frankfurt-postgres.render.com", // Vervang door de host van je Render Postgres database
      port: process.env.DB_PORT || 5432, // Standaard PostgreSQL poort
      database: dbName,
      user: process.env.DB_USER || "postgrestest_igru_user", // Vervang door de gebruiker van je Render Postgres database
      password: process.env.DB_PASSWORD || "ezml9yGeWXsbckSCjt0MXFjGWb2sDuLk", // Vervang door het wachtwoord van je Render Postgres database
      ssl: {
        rejectUnauthorized: false, // Belangrijk voor Render (kan anders zijn voor andere providers)
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
      stub: "./migration.stub",
    },
    seeds: {
      directory: "./src/seeds",
      stub: "./seed.stub",
    },
  },
};

export default config;

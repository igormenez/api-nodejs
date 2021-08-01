require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
  // host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  // dialect: process.env.DB_DIALECT || "postgres",
  host: 'localhost',
  username: 'nodeapi',
  password: '1234',
  database: 'nodeauth',
  dialect: 'postgres',
  storage: './__tests__/database.sqlite',
  operatorsAliasses: false,
  logging: false,
  define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
  }
}; 
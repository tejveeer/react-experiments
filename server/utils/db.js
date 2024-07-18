const postgres = require("postgres");

module.exports = postgres({
  host: "localhost",
  username: "postgres",
  password: "1234",
  database: "test",
  port: 5433,
});
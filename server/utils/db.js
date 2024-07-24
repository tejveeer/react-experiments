const postgres = require("postgres");

module.exports = postgres({
  host: "localhost",
  username: "tejveer",
  password: "1234",
  database: "test",
  port: 5432,
});
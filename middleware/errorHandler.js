const { logEvents } = require("./logEvents");

function errorHandler(err, req, res) {
  logEvents(`${err.name}: ${err.message}`, "errorlog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
}

module.exports = errorHandler;

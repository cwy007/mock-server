const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const generateBarenterService = require("./api/bartender");
const generateColumnHeaderService = require("./api/columnHeader");
const port = process.argv[2];
// Create server
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create database instance and start server
const adapter = new FileAsync("db.json");
low(adapter)
  .then((db) => {
    generateBarenterService(db, app);
    generateColumnHeaderService(db, app);
    // Set db default values
    return db;
  })
  .then(() => {
    app.listen(port || 3001, () =>
      console.log(`listening on port ${port || 3001}`)
    );
  });

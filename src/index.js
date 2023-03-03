const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

dburl = process.env.MONGODB_URL;
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const PORT = process.env.PORT || 5000;

db.on("error", console.error.bind(console, "mongodb connection error found: "));
db.once("open", () => {
  console.log(`mongoose is running.`);
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});


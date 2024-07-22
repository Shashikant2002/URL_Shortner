const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config");

const connectDataBase = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Mongodb connected Successfull !!");
    })
    .catch((err) => {
      console.log(err, "Not connected to Mongodb !!");
    });
};

module.exports = connectDataBase;

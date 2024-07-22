const express = require("express");
const { PORT } = require("./config");
const app = express();
const path = require("path");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const UrlRoutes = require("./Routes/URL.Routes");
const connectDataBase = require("./Utils/ConnectDBS");
const limiter = require("./Utils/FixRateLimit");



app.use("/api/v1/", UrlRoutes);

app.use("/", limiter, async (req, res) => {
  return res.render("home");
});

connectDataBase();
app.listen(PORT, (server) => {
  console.log(`Server is Started on http://localhost:${PORT} !!`);
});

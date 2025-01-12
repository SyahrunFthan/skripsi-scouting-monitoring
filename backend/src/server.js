const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Model, Database, dan Routing
const db = require("./configs/Database");
const routeActivities = require("./routes/RouteActivities");
const routeSchools = require("./routes/RouteSchools");
const routeContribution = require("./routes/RouteContribution");
const routeAuth = require("./routes/RouteAuth");
const routeNews = require("./routes/RouteNews");
const routeImages = require("./routes/RouteImages");
// const createModel = require("./models/News");

const app = express();

try {
  db.authenticate();
  console.log("Database connected...");
  // createModel.sync();
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(fileUpload());

app.use("/public", express.static("public"));

// Route Path
app.use("/auth", routeAuth);
app.use("/activities", routeActivities);
app.use("/schools", routeSchools);
app.use("/contributions", routeContribution);
app.use("/news", routeNews);
app.use("/images", routeImages);

const port = process.env.PORT_APP || 5001;

app.listen(port, () => console.log(`Server run port: ${port}`));

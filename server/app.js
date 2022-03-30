const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const authRouter = require("./routes/auth");
const propertyRouter = require("./routes/property");
const tenantRouter = require("./routes/tenant");
const userRouter = require("./routes/user");
const maintenanceRouter = require("./routes/maintenance");
const invoiceRouter = require("./routes/invoice");
const leaseRouter = require("./routes/lease");
// var multer = require("multer");
// var upload = multer();

const { json, urlencoded } = express;
const cors = require("cors");

connectDB();
const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static(join(__dirname, "public")));

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.use("/auth", authRouter);
app.use("/property", propertyRouter);
app.use("/tenant", tenantRouter);
app.use("/user", userRouter);
app.use("/maintenance", maintenanceRouter);
app.use("/invoice", invoiceRouter);
app.use("/lease", leaseRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };

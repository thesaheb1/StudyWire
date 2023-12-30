// imports
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// imports route
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// parse json data from body
app.use(express.json());

// parse token from cookie
app.use(cookieParser());

//  restricts web pages from making requests to a different domain
app.use(
  cors({
    // This specifies the allowed origin
    origin: "https://studywire.vercel.app",
    // server can receive and process credentials like cookies and HTTP authentication
    credentials: true,
  })
);

// store the uploaded files in temporary files in the /tmp directory
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// port
const PORT = process.env.PORT || 4001;

// database connection
require("./config/database").connect();
// cloudinary connection
require("./config/cloudinary").connect();

// middleware
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// homepage route
app.get("/", (req, res) => {
  res.send({
    status:"success",
    message: "Server is running"
  });
});

// server creation
app.listen(PORT, () => {
  console.log("Server is running at PORT : ", PORT);
});

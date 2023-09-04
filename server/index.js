const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookiePareser = require("cookie-parser");
const RegisterModel = require("./models/Register");
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token us missing");
  } else {
    jwt.verify(token, "iamsky", (err, decoded) => {
      if (err) {
        return res.json("errorr with token");
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.json("not admin");
        }
      }
    });
  }
};

app.get("/darshboard", varifyUser, (req, res) => {
  res.json("Success");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body; 
  console.log({ name, email, password });
  bcrypt
    .hash(password, 10) 
    .then((hash) => {
      RegisterModel.create({ name, email, password: hash })
        .then((user) => res.json({ status: "Ok" }))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  RegisterModel.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "iamsky",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ Status: "Success", role: user.role });
        } else {
          return res.json("password is incorrect");
        }
      });
    } else {
      return res.json("no user exists");
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

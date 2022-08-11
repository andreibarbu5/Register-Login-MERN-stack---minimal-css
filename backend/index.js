const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mare");

app.post("/api/register", async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });

    res.json({ message: "User Created", user: "ok" });
  } catch (err) {
    res.json({ message: "Duplicate Email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.json({ message: "Check email and password" });
  } else {
    console.log("user found");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ message: "Incorrect Email or Password" });
  }
});

app.get("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const istoken = await jwt.verify(token, "secret123");
    const email = istoken.email;
    const user = await UserModel.findOne({ email: email });
    console.log(user);

    res.json({ status: "ok", quote: user.quote });
  } catch (err) {
    res.json({ status: "error", message: "Papau Ivalid Token" });
  }
});

app.post("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const istoken = await jwt.verify(token, "secret123");
    const email = istoken.email;
    const user = await UserModel.updateOne(
      { email: email },
      { $set: { quote: req.body.tempQuote } }
    );

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

app.listen(4700, () => console.log("Server started on port 4700"));

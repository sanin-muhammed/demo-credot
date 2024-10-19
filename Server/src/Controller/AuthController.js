const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const { createJWT } = require("../Utils/jwt");

// @des:login api
// method:post
// api:/api/auth/login

exports.login = async (req, res) => {
  console.log("req body =", req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const data = {
          userId: user._id,
          email: user.email,
        };
        const token = await createJWT(data);
        res.status(200).json({ error: false, status: true, message: "user logined successfully", data, token });
        console.log("user logined successfully".yellow);
      } else {
        res.status(400).json({ error: true, status: false, message: "incorrect password" });
        console.log("incorrect password".red);
      }
    } else {
      res.status(400).json({ error: true, status: false, message: "email not exist" });
      console.log("email not exist".red);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error ", error);
  }
};

// @des:register api
// method:post
// api:/api/auth/register

exports.register = async (req, res) => {
  console.log("req body =", req.body);
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ error: true, message: "email already used" });
      console.log("email already exist".red.bold);
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log("new user =".bold, newUser);
    const data = {
      userId: newUser._id,
      email: newUser.email,
    };
    const token = await createJWT(data);
    console.log("Token :", token);
    res.status(200).json({ error: false, status: true, message: "user registered successfully", data, token });
    console.log("user registered successfully".yellow);
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error ", error);
  }
};

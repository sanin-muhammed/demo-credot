const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const { createJWT } = require("../Utils/jwt");

// @des:login api
// method:POST
// api:/api/auth/login

exports.login = async (req, res) => {
  console.log("req body =", req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // find user
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password); //compare the two passwords
      if (passwordMatch) {
        const data = {
          userId: user._id,
          email: user.email,
        };
        const token = await createJWT(data); // create JWT token
        res.status(200).json({ error: false, status: true, message: "user logined successfully", data, token }); // success response
        console.log("user logined successfully".yellow);
      } else {
        res.status(400).json({ error: true, status: false, message: "incorrect password" }); // error response
        console.log("incorrect password".red);
      }
    } else {
      res.status(400).json({ error: true, status: false, message: "email not exist" }); // error response
      console.log("email not exist".red);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
    console.log("server error ", error);
  }
};

// @des:register api
// method:POST
// api:/api/auth/register

exports.register = async (req, res) => {
  console.log("req body =", req.body);
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email }); // check user already exist with the given email
    if (userExist) {
      res.status(400).json({ error: true, message: "email already used" }); // error response
      console.log("email already exist".red.bold);
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10); // bcrypt  the password
    const newUser = new User({ email, password: hashedPassword }); // create new user
    await newUser.save(); // save new user
    console.log("new user =".bold, newUser);
    const data = {
      userId: newUser._id,
      email: newUser.email,
    };
    const token = await createJWT(data); // create JWT token
    console.log("Token :", token);
    res.status(200).json({ error: false, status: true, message: "user registered successfully", data, token }); // success response
    console.log("user registered successfully".yellow);
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // error response
    console.log("server error ", error);
  }
};

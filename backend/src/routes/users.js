const express = require("express");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {check, validationResult} = require('express-validator')

router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({min:6})
],  async (req, resp) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resp.status(400).json({message: errors.array()})
    }
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
    });

    if (user) {
      return resp.status(400).json({ message: "User already exists" });
    }
    user = new UserModel(req.body);
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
    });

    resp.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
    })
    return resp.status(200).send({ message: "User registered OK" });
  } catch (err) {
    console.log(err);
    resp.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router;
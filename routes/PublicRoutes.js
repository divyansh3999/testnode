const express = require("express");
const route = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize');

// all employees
route.get("/all", async (req, res) => {
  await db.Employee.findAll().then((data) => {
    if (data.length != 0) {
      res.send({
        status: "success",
        result: data,
      });
    } else {
      res.send({
        status: "error",
        message: "data not found",
      });
    }
  });
});

// post api
route.post("/signup", async (req, res) => {
  if (req.body.password === req.body.confirmPassword) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    await db.Employee.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashPassword
    })
      .then((signupData) =>
        res.status(200).send({
          status: "success",
          result: signupData,
        })
      )
      .catch((error) => {
        // if (error.name === "SequelizeUniqueConstraintError") {
        //   res.status(403);
        // } else {
          //   res.status(500);
          //   res.send({ status: "error", message: "Something went wrong" });
          // }
          res.send({ status: "error", message: error.errors.map((item) => item.message) });
      });
  } else {
    res.send({
        status: "error",
        message: "password not matched.",
    });
  }
});

module.exports = route;

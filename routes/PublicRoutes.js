const express = require("express");
const route = express.Router();
const db = require("../models");
const verifyToken = require("../middleware/AuthMiddleware");

// all employees
route.get("/all", verifyToken, async (req, res) => {
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

// delete employee
route.delete("/delete/:id", verifyToken, async (req, res) => {
  db.Employee.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.send({
      status: "success",
      message: "Employee Deleted Successfully",
    })
  );
});

// update dadta
route.put("/edit-emp/:id", verifyToken, async(req, res) => {
    await db.Employee.update({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }, {
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.send({
        status: "success",
        message: "Employee Updated Successfully",
      })
    });
});

module.exports = route;

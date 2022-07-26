const express = require("express");
const route = express.Router();
const db = require("../models");
const verifyToken = require("../middleware/AuthMiddleware");

// all employees
route.get("/all", verifyToken, async (req, res) => {
  await db.Employee.findAll({
    include: [db.Company],
    attributes: { exclude: ["password"] },
  }).then((data) => {
    if (data.length != 0) {
      res.send({
        status: "success",
        employees: data,
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

// --------- show employee details data --------
route.get("/edit-emp/:id", verifyToken, async (req, res) => {
  await db.Employee.findAll({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
  }).then((data) => {
    res.send({
      status: "success",
      data: data,
    });
  });
});

// -------- update employee details --------
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

var upload = multer({ storage: storage });

route.put(
  "/update-emp/:id",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    await db.Employee.update(
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        image: req.file.filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() =>
      res.send({
        status: "success",
        message: "Employee updated successfully.",
      })
    );
  }
);

module.exports = route;

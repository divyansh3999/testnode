const express = require("express");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const path = require("path");

// -------- signup ---------
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

router.post("/signup", upload.single("image"), async (req, res, next) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  if (req.body.name && req.body.phone && req.body.email && req.body.password) {
    if (req.body.password === req.body.confirmPassword) {
      const duplicateCheck = await db.Employee.findOne({
        where: {
          email: req.body.email,
          phone: req.body.phone,
        },
      });

      if (duplicateCheck === null) {
        await db.Employee.create({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          password: hashPassword,
          image: req.file.filename,
          company_id: req.body.company_id,
        }).then((signupData) => {
          res
            .status(200)
            .send({
              status: "success",
              result: signupData,
            })
        }).catch((error) => {
          if (error.name === "SequelizeUniqueConstraintError") {
            res.status(403);
          } else {
            res.status(500);
            res.send({
              status: "error",
              message: "Something went wrong",
            });
          }
        });
      } else {
        res.send({
          status: "error",
          message: "Duplicate entry not allowed",
        });
      }
    } else {
      res.send({
        status: "error",
        message: "Password not matched.",
      });
    }
  } else {
    res.send({
      status: "error",
      message: "Please fill the all fields.",
    });
  }
});

// ------- login --------
router.post("/login", async (req, res) => {
  const checkEmail = await db.Employee.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (checkEmail) {
    const validPass = await db.Employee.findOne({
      where: {
        email: req.body.email,
      },
    });

    const comparePassword = await bcrypt.compareSync(
      req.body.password,
      validPass.password
    );

    if (comparePassword) {
      const loginResponse = await db.Employee.findOne({
        where: {
          email: req.body.email,
        },
        attributes: { exclude: ["password"] },
      });

      const tokens = jwt.sign(
        {
          id: loginResponse.id,
          name: loginResponse.name,
          email: loginResponse.email,
          phone: loginResponse.phone,
        },
        process.env.ACCESS_SECRET_KEY
      );

      res.send({
        status: "success",
        message: "Login Successfull",
        employee: loginResponse,
        token: tokens,
      });
    } else {
      res.send({
        status: "error",
        message: "Incorrect Password",
      });
    }
  } else {
    res.send({
      status: "error",
      message: "Email not found",
    });
  }
});

module.exports = router;

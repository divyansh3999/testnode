const express = require("express");
const route = express.Router();
const db = require("../models");

route.post("/add-company", async (req, res) => {
  const checkCompany = await db.Company.findOne({
    where: {
      company_name: req.body.company_name
    }
  });
  if (!checkCompany) {
    await db.Company.create({
      company_name: req.body.company_name,
    }).then(() => {
      res.send({
        status: "success",
        message: "company name added successfully",
      });
    });
  } else {
    res.send({
      status: "error",
      message: "company name already exists.",
    });
  }
});

module.exports = route;

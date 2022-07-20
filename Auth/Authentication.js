const express = require('express');
const db = require("../models");
const router = express.Router();
const bcrypt = require("bycrpt");

// signup
// router.post("/signup", async (req, res) => {
//     const hashPassword = bcrypt.hashSync(req.body.password, 10);
//     if (req.body.name && req.body.phone && req.body.email && req.body.password) {
//         if (req.body.password === req.body.confirmPassword) {
//             const duplicateCheck = await db.Employee.findOne({
//                 where: {
//                     email: req.body.email,
//                     phone: req.body.phone
//                 },
//             });

//             if (duplicateCheck === null) {
                
//             } else {
//                 res.send({
//                     status: "error",
//                     message: "Duplicate entry not allowed",
//                 });
//             }
//         } else {
//             res.send({
//                 status: "error",
//                 message: "Password not matched.",
//             });
//         }
//     }else{
//         res.send({
//             status: "error",
//             message: "Please fill the all fields.",
//         });
//     }
// })
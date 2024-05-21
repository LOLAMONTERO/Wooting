const express = require("express");

const router = express.Router();

router.get("/index", (req, res) => {
  res.render("index");
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/help", (req, res) => {
  res.render("help");
});

router.get("/products", (req, res) => {
  res.render("products");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;

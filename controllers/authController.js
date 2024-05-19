const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    req.session.userId = user.id;
    res.redirect("/acoustic");
  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).send("Error registering new user");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id;
      req.session.username = user.username;
      res.redirect("/index");
    } else {
      res.status(401).send("Usuario o contraseña incorrecta");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Error logging in user");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out user:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/login");
  });
};

exports.dashboard = (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("wooting", { username: req.session.username });
};

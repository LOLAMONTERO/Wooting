const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });
    
    // Si el usuario ya existe, mostrar un mensaje de error
    if (existingUser) {
      return res.status(400).send('El correo electrónico ya está en uso');
    }

    // Si el usuario no existe, proceder con el registro
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
   
    res.redirect('/');
  } catch (error) {
    console.error('Error registering new user:', error);
    res.status(500).send('Error registering new user');
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      r
      req.session.email = user.email;
      res.redirect('/index');
    } else {
      res.status(401).send('Usuario o contraseña incorrecta');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out user:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
};

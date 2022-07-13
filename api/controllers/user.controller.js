const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendMail = require("../helpers/sendMail");
const validateEmail = require("../helpers/validateEmail");
const createToken = require("../helpers/createToken");
exports.register = async (req, res) => {
  try {
    // get info
    const { name, email, password, password2 } = req.body;

    // check fields
    if (!name || !email || !password || !password2)
      return res.status(400).json({ message: "Please fill all an fields" });

    // check format
    if (!validateEmail(email))
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });

    // check user
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "This email is already registered in our system" });

    // check password
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    if (password !== password2)
      return res.status(400).json({ message: "Passwords do not match" });

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    // create token
    const newUser = { name, email, password: hashPassword };
    const activation_token = createToken.activation(newUser);
    // send email

    const url = `http://localhost:3000/api/auth/activate/${activation_token}`;

    sendMail.sendEmailRegister(email, url, "Verify your email");

    // registration success

    res.status(200).json({ message: "Welcome! please Check your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, phone, email, image, password } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPass) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hashedPass);

      const user = {
        username,
        phone,
        email,
        image,
        password: hashedPass
      };

      console.log(user);

      const newUser = new User(user);
      try {
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    bcrypt.compare(password, foundUser.password, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({
          message: err,
        });
      }
      if (result) {
        console.log(result);
        let token = jwt.sign(
          { username: foundUser.username },
          "verysecretvalue",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          message: "Login successfull",
          token,
        });
      } else {
        res.status(400).json({
          message: "Wrong password",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "This user could not be found in our database" });
  }
};

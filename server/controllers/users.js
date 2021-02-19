import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, phone, email, image, password } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPass) => {
    if (err) {
      res.status(400).json({
        message: "An error ocucurred",
      });
    } else {
      const user = {
        username,
        phone,
        email,
        image,
        password: hashedPass,
      };

      const newUser = new User(user);
      try {
        await newUser.save();
        res.status(201).json({
          user: newUser,
          message: "Registration successfull",
        });
      } catch (error) {
        res.status(400).json({
          message: "Username or email already taken.",
        });
      }
    }
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });
    bcrypt.compare(password, foundUser.password, function (err, result) {
      if (err) {
        res.status(400).json({
          message: err,
        });
      }
      if (result) {
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
          user: {
            email: foundUser.email,
            username: foundUser.username,
            image: foundUser.image,
            phone: foundUser.phone,
            createdAt: foundUser.createdAt,
          },
        });
      } else {
        res.status(401).json({
          message: "Wrong password",
        });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "This user could not be found in our database" });
  }
};

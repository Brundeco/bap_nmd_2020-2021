import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, phone, email, password } = req.body;

  bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
    if (err) {
        
      console.log(err);
   
    } else {

      console.log(hashedPass);

      const user = {
        username,
        phone,
        email,
        password: hashedPass,
      };

      console.log(user);

      const newUser = new User(user);
      try {
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    }
  });
};
import User from '../models/users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const register = async (req, res) => {
  const { username, phone, email, image, password } = req.body

  bcrypt.hash(password, 10, async (err, hashedPass) => {
    if (err) {
      res.status(400).json({
        message: 'An error ocucurred',
      })
    } else {
      const user = {
        username,
        phone,
        email,
        image,
        password: hashedPass,
      }

      const newUser = new User(user)
      try {
        await newUser.save()
        res.status(201).json({
          user: newUser,
          message: 'Registration successfull',
        })
      } catch (error) {
        res.status(400).json({
          message: 'Username or email already taken.',
        })
      }
    }
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const foundUser = await User.findOne({ email: email })
    bcrypt.compare(password, foundUser.password, function (err, result) {
      if (err) {
        res.status(400).json({
          message: err,
        })
      }
      if (result) {
        let token = jwt.sign(
          { user: foundUser._id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: '10h',
          }
        )
        res.status(200).json({
          message: 'Login successfull',
          token: token,
          user: {
            email: foundUser.email,
            id: foundUser._id,
            username: foundUser.username,
            image: foundUser.image,
            phone: foundUser.phone,
            createdAt: foundUser.createdAt,
          },
        })
      } else {
        res.status(401).json({
          message: 'Wrong password',
        })
      }
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'This user could not be found in our database' })
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    res.status(200).json({ favEvents: user.favEvents })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const likeEvent = async (req, res) => {
  const { id } = req.params
  const { favEvents } = req.body

  console.log(favEvents)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  try {
    const updateUser = {
      favEvents,
    }

    await User.findByIdAndUpdate(id, updateUser, { new: true })

    res.json(updateUser)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

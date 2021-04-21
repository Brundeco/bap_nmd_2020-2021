import User from '../models/users.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import dotenv from 'dotenv'

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

export const passwordReset = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email: email })
    if (user === null) {
      res.status(403).json({ message: 'No user found with that email adress' })
    } else {
      const token = crypto.randomBytes(20).toString('hex')
      await user.updateOne({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      })

      const transporter = nodemailer.createTransport({
        host: 'send.one.com',
        secureConnection: false,
        port: 587,
        auth: {
          user: 'info@popapp.be',
          pass: process.env.OUTLOOK_PASS,
        },
      })

      let mailOptions = {
        from: 'info@popapp.be',
        to: email,
        subject: 'Link to reset password!',
        text: `This is a password reset mail? Click on this link: ${process.env.CLIENT_URL}/reset/${token}`, // plaintext body
        html: `This is a password reset mail? Click on this link: ${process.env.CLIENT_URL}/reset/${token}`,
      }

      try {
        transporter.sendMail(mailOptions, (err, success) => {
          if (err) {
            console.log('there was an error')
            res.status(400).json({ messsage: err })
          } else {
            console.log('Nodemailer success: ', success)
            res.status(200).json({ message: 'Mail successfully sent' })
          }
        })
      } catch (error) {
        console.log(error)
        res.status(400).json({ error })
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const passwordUpdate = async (req, res) => {
  const { token } = req.params
  try {
    await User.findOne({
      $and: [
        {
          resetPasswordToken: {
            $in: token,
          },
        },
        {
          resetPasswordExpires: {
            $gt: Date.now(),
          },
        },
      ],
    }).then((user) => {
      if (user === null) {
        console.log('Password reset link is expired or is invalid')
        res.json('Password reset link is expired or is invalid')
      } else {
        res
          .status(200)
          .json({ message: 'Valid reset link', username: user.username })
      }
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const saveNewPassword = async (req, res) => {
  try {
    await User.findOne({
      username: {
        $in: req.params.username,
      },
    }).then((user) => {
      if (user === null) {
        console.log('No user found')
        res.json('No user found')
      } else {
        bcrypt.hash(req.params.password, 10, async (err, hashedPass) => {
          console.log(hashedPass)
          await user
            .updateOne({
              password: hashedPass,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            })
            .then(() => {
              res.status(200).json({ message: 'All set! 🚀' })
            })
            .catch((err) => res.status(400).json({ message: err }))
        })
      }
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const likeEvent = async (req, res) => {
  const { id } = req.params
  const { favEvents } = req.body

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

export const likeProperty = async (req, res) => {
  const { id } = req.params
  const { favProperties } = req.body

  console.log(id)
  console.log(favProperties)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  try {
    const updateUser = {
      favProperties,
    }

    await User.findByIdAndUpdate(id, updateUser, { new: true })

    res.json(updateUser)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

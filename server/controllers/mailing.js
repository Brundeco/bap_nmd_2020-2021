'use strict'

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendMail = async (req, res) => {
  console.log(req.body)

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
    text: req.body.message,
    html: `<b>Booking successful!</b><br> ${req.body.message}`,
  }

  try {
    transporter.sendMail(mailOptions, () => {
      res.status(200).json({ message: 'Booking successful!' })
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

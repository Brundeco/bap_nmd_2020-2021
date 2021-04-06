'use strict'

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendMail = async (req, res) => {
  console.log(req.body)

  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: 'brundeco@student.arteveldehs.be',
      pass: process.env.OUTLOOK_PASS,
    },
  })

  let mailOptions = {
    from: 'brundeco@student.arteveldehs.be', // sender address (who sends)
    to: req.body.receiver, // list of receivers (who receives)
    subject: 'Booking successful!', // Subject line
    text: req.body.message, // plaintext body
    html: `<b>Booking successful!</b><br> ${req.body.message}`, // html body
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

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     // return console.log(error)
//     res.status(400).json({ error })
//   }
//   // res.status(200).json({ message: 'Message sent: ' + info.response })
//   res.status(200).json({ message: 'Booking successful!' })
// })

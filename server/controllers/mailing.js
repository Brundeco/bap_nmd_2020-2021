'use strict'

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendMail = async (req, res) => {
  const mailInfo = req.body
  console.log(mailInfo)

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
    to: mailInfo.receiver,
    subject: 'Booking info Popapp',
    text: 'Text here',
    html: `Hey ${mailInfo.user} <br><br> We received your payment and have therefore successfully completed your booking.
    <br><br>
    For your reservation details click the link below.
    <br><br>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 3px;" bgcolor="#414dfb"><a href=${process.env.CLIENT_URL}/reservations/${mailInfo.user_id} target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 12px 18px; border: 1px solid #414dfb; display: inline-block;">Reservation details</a></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    <br>
    If you have any questions concerning your booking please contact ${mailInfo.firstname} ${mailInfo.lastname} via our built in chat or on the following email: ${mailInfo.email}
    <br><br>
    Thanks for using Popapp!
    <br>
    Kind regards`,
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

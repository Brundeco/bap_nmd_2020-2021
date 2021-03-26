import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Textarea, Header, FontAwesome } from '../../components'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import profileImg from './../../images/event-4.jpg'

let socket

export default ({ match }) => {
  const [data, setData] = useState()
  const user = JSON.parse(localStorage.getItem('user'))
  const sender = JSON.parse(localStorage.getItem('user'))
  const [messages, setMessages] = useState([])
  const [ioMsg, setIoMsg] = useState([])
  const [ioMsgs, setIoMsgs] = useState([])
  const ENDPOINT = 'http://localhost:5000'
  const recepient = match.params

  useEffect(() => {
    const room = match.params.recepient_id
    const name = match.params.recepient

    socket = io(ENDPOINT)
    socket.emit('join')
  }, [ENDPOINT, match.params])

  const sendMessage = (e) => {
    e.preventDefault()
    if (ioMsg) {
      socket.emit('sendMessage', ioMsg, () => setIoMsg(''))
    }
  }

  console.log(ioMsg, ioMsgs)

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
    setIoMsg(value)
  }

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/messages/filter/${match.params.conversation_id}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err))
  }, [])

  const postMessage = () => {
    axios
      .post('http://localhost:5000/messages', {
        message: data.message,
        from: sender.id,
        fromName: sender.username,
        to: recepient.recepient_id,
        toName: recepient.recepient,
        read: false,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // console.log(messages)
  }, [messages])

  return (
    <div className="dashboard-screen ">
      <Header />
      <div className="chat-screen page-wrapper">
        <div className="chat-top">
          <FontAwesome icon={faChevronLeft} />
          <h1>{match.params.recepient}</h1>
          <img src={profileImg} alt="profile" />
        </div>
        <section className="conversation-box">
          {messages?.map((message, i) => {
            return (
              <p
                key={i}
                className={
                  message.fromName == user.username
                    ? 'float-right'
                    : 'float-left'
                }
              >
                {message.message}
              </p>
            )
          })}
        </section>

        <Textarea
          name="message"
          onChange={handleChange}
          placeholder="Message"
          type="textarea"
        />
        <button onClick={() => postMessage()}>Send</button>
        {/* <button onClick={(e) => sendMessage(e)}>Send</button> */}
      </div>
    </div>
  )
}

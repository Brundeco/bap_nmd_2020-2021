import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Textarea, Header, FontAwesome, CheckSession } from '../../components'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaperplaneIcon from './../../icons/send-paperplane.svg'
import ScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT = `${process.env.REACT_APP_API_URL}`
const socket = io.connect(ENDPOINT)

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))
  const [data, setData] = useState()
  const user = JSON.parse(localStorage.getItem('user'))
  const sender = JSON.parse(localStorage.getItem('user'))
  const [messages, setMessages] = useState([])
  const [ioMsg, setIoMsg] = useState([])
  const [ioMsgs, setIoMsgs] = useState([])
  const recepient = match.params

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
    setIoMsg(value)
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('registration', user.id)
      socket.on('receive-message', (message) => {
        console.log(message)
      })
    })
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/messages/filter/${match.params.conversation_id}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err))
  }, [])

  const postMessage = () => {
    socket.emit('new-message', {
      id: match.params.recepient_id,
      message: data.message,
    })

    axios
      .post(`${process.env.REACT_APP_API_URL}/messages`, {
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
          {/* <FontAwesome icon={faChevronLeft} /> */}
          <h1> Gesprek met {match.params.recepient}</h1>
          {/* <img src={profileImg} alt="profile" /> */}
        </div>

        <ScrollToBottom>
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
        </ScrollToBottom>

        <div className="chat-bottom">
          <Textarea
            name="message"
            onChange={handleChange}
            placeholder="Message"
            type="textarea"
            className="send-message"
          />
          <button className="send-message-btn" onClick={() => postMessage()}>
            <img src={PaperplaneIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

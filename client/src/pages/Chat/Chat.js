import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Textarea, Header, FontAwesome } from '../../components'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaperplaneIcon from './../../icons/send-paperplane.svg'
import ScrollToBottom from 'react-scroll-to-bottom'

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
    // socket.emit('new-message', {
    //   id: match.params.recepient_id,
    //   message: data.message,
    // })

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

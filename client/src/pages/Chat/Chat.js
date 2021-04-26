import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Textarea, Header, FontAwesome, CheckSession } from '../../components'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaperplaneIcon from './../../icons/send-paperplane.svg'
import ScrollToBottom from 'react-scroll-to-bottom'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))
  const [data, setData] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const sender = JSON.parse(localStorage.getItem('user'))
  const [messages, setMessages] = useState([])
  const recepient = match.params
  const ENDPOINT = `${process.env.REACT_APP_API_URL}`
  const socket = io(ENDPOINT)

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  console.log('New chat version')

  useEffect(() => {
    // try {
    socket.on('connect', () => {
      socket.emit('registration', user.id)
      socket.on('receive-message', (message) => {
        console.log(message)
        console.log('Message zou hier moeten komen')
        setMessages((prev) => [...prev, message])
      })
    })
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/messages/filter/${match.params.conversation_id}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err))
    // } catch (error) {
    //   console.log(error)
    // }
  }, [])

  const postMessage = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/messages`, {
        message: data.message,
        from: sender.id,
        fromName: sender.username,
        to: recepient.recepient_id,
        toName: recepient.recepient,
        read: false,
      })
      .then((res) => {
        let arr = messages
        arr.push(res.data)
        setMessages([...arr])
        socket.emit('new-message', {
          id: match.params.recepient_id,
          message: res.data.message,
        })
        setData((prev) => ({
          ...prev,
          message: '',
        }))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="dashboard-screen ">
      {/* <Header /> */}
      <div className="chat-screen page-wrapper">
        <div className="chat-top">
          <h1> Gesprek met {match.params.recepient}</h1>
        </div>

        <ScrollToBottom debsug={false}>
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
          <textarea
            className="send-message"
            placeholder="message"
            name="message"
            onChange={(e) => handleChange('message', e.target.value)}
            value={data.message}
            required="required"
          />
          <button className="send-message-btn" onClick={() => postMessage()}>
            <img src={PaperplaneIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

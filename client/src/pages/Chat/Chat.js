import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Textarea, Header, FontAwesome, CheckSession } from '../../components'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaperplaneIcon from './../../icons/send-paperplane_black.svg'
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

  const fetchMessages = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/messages/filter/${match.params.conversation_id}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('registration', user.id)
      socket.on('receive-message', () => {
        fetchMessages()
      })
    })
    fetchMessages()
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
        fetchMessages()
        socket.emit('new-message', {
          id: match.params.recepient_id,
          message: res.data.message,
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <React.Fragment>
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />
      <div className="chat-screen">
        <section>
          <div className="chat-info">
            <h1 className="main-title">Gesprek met {match.params.recepient}</h1>
          </div>
        </section>

        <section>
          <div className="chat-content">
            <ScrollToBottom debsug={false}>
              <section className="conversation-wrapper">
                {messages?.map((message, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        message.fromName == user.username
                          ? 'float-right'
                          : 'float-left'
                      }
                    >
                      <p>{message.message}</p>
                    </div>
                  )
                })}
              </section>
            </ScrollToBottom>
          </div>
        </section>

        {/* <section> */}
          <div className="chat-cta">
            <textarea
              className="send-message"
              placeholder="message"
              name="message"
              onChange={(e) => handleChange('message', e.target.value)}
              value={data.message}
              required="required"
            />
            <button className="send-message-btn" onClick={() => postMessage()}>
              <img src={PaperplaneIcon} alt="" /> send
            </button>
          </div>
        {/* </section> */}
      </div>
    </React.Fragment>
  )
}

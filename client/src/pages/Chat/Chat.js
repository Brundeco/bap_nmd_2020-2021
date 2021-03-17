import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Textarea } from '../../components'

let socket

export default ({ match }) => {
  const [data, setData] = useState()
  const user = JSON.parse(localStorage.getItem('user'))
  const sender = JSON.parse(localStorage.getItem('user'))
  const [messages, setMessages] = useState([])
  const recepient = match.params

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/messages/filter/${match.params.conversation_id}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    console.log(messages)
  }, [messages])

  const postMessage = () => {
    axios
      .post('http://localhost:5000/messages', {
        message: data.message,
        from: sender.id,
        fromName: sender.username,
        to: recepient.recepient_id,
        toName: recepient.recepient,
        conversationNameStr: sender.username + '_' + recepient.author,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  // const [author, setAuthor] = useState();
  // const [author_id, setAuthor_id] = useState();
  // const ENDPOINT = "http://localhost:5000";

  // useEffect(() => {
  //   const { author, author_id } = match.params;

  //   socket = io(ENDPOINT);

  //   setAuthor(author);
  //   setAuthor_id(author_id);

  //   socket.emit("join", { author, author_id });

  //   return () => {
  //     socket.emit("disconnect");

  //     socket.off();
  //   };
  // }, [ENDPOINT, match.params]);

  return (
    <div>
      <h1>Chat</h1>
      <section className="conversation-box">
        {messages?.map((message) => {
          return (
            <p
              className={
                message.fromName == user.username
                  ? ' float-left '
                  : 'float-right'
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
      {/* <Link to={{pathname: `/messages/602fc3b5c5e21edf10c3039e/6030156a280a2dfd10823c1c`}}>
        <li>GET MESSAGES</li>
      </Link> */}
      <button onClick={() => postMessage()}>Send</button>
    </div>
  )
}

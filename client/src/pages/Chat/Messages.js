import React, { useState, useEffect } from 'react'
import { ConvertDate, Header } from '../../components'
import axios from 'axios'

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [timestamps, setTimestamps] = useState()
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/messages/${user.id}`)
      .then((res) => setMessages(res.data))
      .catch(console.log('NO DATA'))
  }, [])

  useEffect(() => {
    let groupBy = (array, key) => {
      return array.reduce((result, obj) => {
        ;(result[obj[key]] = result[obj[key]] || []).push(obj)
        return result
      }, {})
    }

    setConversations(groupBy(messages, 'conversationId'))

    let tmpTs = []
    messages?.createdAt?.map((item) => {
      tmpTs.push({ image: item })
      setTimestamps(tmpTs)
    })
  }, [messages])

  return (
    <div className="conversations-screen">
      <Header />
      <div className="page-wrapper">
        <h2>Conversations</h2>
        {conversations &&
          Object.keys(conversations).map((key, i) => {
            console.log(conversations[key].slice(-1)[0].from)
            const timestamp = new Date(
              conversations[key].slice(-1)[0].createdAt
            )
            console.log(timestamp)
            return (
              <section
                key={i}
                className="chat"
                onClick={() =>
                  (window.location = `/chat/${
                    conversations[key].slice(-1)[0].from == user.id
                      ? conversations[key].slice(-1)[0].to
                      : conversations[key].slice(-1)[0].from
                  }/${
                    conversations[key].slice(-1)[0].fromName == user.username
                      ? conversations[key].slice(-1)[0].toName
                      : conversations[key].slice(-1)[0].fromName
                  }/${conversations[key][0].conversationId}`)
                }
              >
                <div className="left">
                  <p>BD</p>
                </div>
                <div className="center">
                  <h4>
                    {conversations[key].slice(-1)[0].fromName == user.username
                      ? conversations[key].slice(-1)[0].toName
                      : conversations[key].slice(-1)[0].fromName}
                  </h4>
                  <p> {conversations[key].slice(-1)[0].message} </p>
                </div>
                <div className="right">
                  <span>
                    {timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </section>
            )
          })}
      </div>
    </div>
  )
}

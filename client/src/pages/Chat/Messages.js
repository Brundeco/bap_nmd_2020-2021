import React, { useState, useEffect } from 'react'
import { ConvertDate } from '../../components'
import axios from 'axios'

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [timestamps, setTimestamps] = useState()
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${user.id}`)
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
    <div>
      <h1>Conversations</h1>
      {conversations &&
        Object.keys(conversations).map((key, i) => {
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
              <h4>
                {conversations[key].slice(-1)[0].fromName == user.username
                  ? conversations[key].slice(-1)[0].toName
                  : conversations[key].slice(-1)[0].fromName}
              </h4>
              <h2> {conversations[key].slice(-1)[0].message} </h2>
            </section>
          )
        })}
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { ConvertDate } from '../../components'
import axios from 'axios'

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [timestamps, setTimestamps] = useState()
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [groups, setGroups] = useState([])
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

  useEffect(() => {
    Object.keys(conversations).forEach((key) => {
      // console.log(key)
      console.log(conversations[key])
    })
  }, [conversations])

  return (
    <div>
      <h1>Conversations</h1>
      <h2>Waarom niet?</h2>
      {conversations &&
        Object.keys(conversations).map((key) => {
          return (
            <section className="chat">
              {conversations[key].map((message) => {
                return (
                  <div>
                    <p> {message.message} </p>
                    <h3>
                      from : {message.fromName} to {message.toName}{' '}
                    </h3>
                  </div>
                )
              })}
            </section>
          )
        })}
    </div>
  )
}

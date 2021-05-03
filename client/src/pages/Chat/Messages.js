import React, { useState, useEffect } from 'react'
import { CheckSession, ConvertDate, Header } from '../../components'
import NoUserIcon from './../../icons/no-user.svg'
import axios from 'axios'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))
  const user = JSON.parse(localStorage.getItem('user'))
  const [timestamps, setTimestamps] = useState()
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/messages/${user.id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    console.log(messages)
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
    <React.Fragment>
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />

      <div className="messages-screen">
        <section>
          <h2>Conversations</h2>
        </section>

        {messages?.length > 0 ? (
          <section>
            {Object.keys(conversations).map((key, i) => {
              const timestamp = new Date(
                conversations[key].slice(-1)[0].createdAt
              )
              return (
                <section key={i} className="message-detail">
                  <button
                    onClick={() =>
                      (window.location = `/chat/${
                        conversations[key].slice(-1)[0].from == user.id
                          ? conversations[key].slice(-1)[0].to
                          : conversations[key].slice(-1)[0].from
                      }/${
                        conversations[key].slice(-1)[0].fromName ==
                        user.username
                          ? conversations[key].slice(-1)[0].toName
                          : conversations[key].slice(-1)[0].fromName
                      }/${conversations[key][0].conversationId}`)
                    }
                  >
                    <div className="left">
                      <img src={NoUserIcon} alt="" />
                    </div>
                    <div className="center">
                      <h4>
                        {conversations[key].slice(-1)[0].fromName ==
                        user.username
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
                  </button>
                </section>
              )
            })}
          </section>
        ) : (
          <section>
            <h2 className="main-title">You don't have messages yet</h2>
          </section>
        )}
      </div>
    </React.Fragment>
  )
}

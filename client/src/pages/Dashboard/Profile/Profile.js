import React, { useState } from 'react'
import { Header } from '../../../components'
import {
  deleteMessages,
  deleteProperties,
  deleteEvents,
  deleteUser,
} from '../../../functions/DeleteUserContent'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [message, setMessage] = useState()
  const [status, setStatus] = useState(false)
  const [showBtn, setShowBtn] = useState(false)

  const handleDelete = (e) => {
    e.preventDefault()
    if (!status) {
      setShowBtn(true)
    }
  }

  const handleStatus = (state) => {
    setStatus(state)
    setShowBtn(state)
    if (state) {
      deleteProperties(user.id)
      deleteEvents(user.id)
      deleteMessages(user.id)
      deleteUser(user.id)
    }
  }

  return (
    <div>
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />
      <section>
        <h1>{message} </h1>
        <button onClick={(e) => handleDelete(e)}>Delete profile</button>
        {showBtn ? (
          <div>
            <button onClick={() => handleStatus(true)}>Yes continue</button>
            <button onClick={() => handleStatus(false)}>
              No I want to stay
            </button>
          </div>
        ) : (
          ''
        )}
      </section>
    </div>
  )
}

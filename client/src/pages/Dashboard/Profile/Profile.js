import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { CheckSession, Header } from '../../../components'
import { app } from '../../../base'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [message, setMessage] = useState()
  const [status, setStatus] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [approval, setApproval] = useState(false)

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/properties/admin`, {
        id: user.id,
      })
      .then(async (res) => {
        const properties = await res.data
        if (properties.length > 0) {
          console.log(res.data)
          setStatus(false)
        } else {
          console.log(res.data)
          setStatus(true)
        }
      })

    axios
      .post(`${process.env.REACT_APP_API_URL}/events/admin`, { id: user.id })
      .then(async (res) => {
        const events = await res.data
        if (events.length > 0) {
          console.log(res.data)
          setStatus(false)
        } else {
          console.log(res.data)
          setStatus(true)
        }
      })
  }, [])

  const handleDelete = (e) => {
    e.preventDefault()
    if (!status) {
      setMessage('All your content will be deleted')
      setShowBtn(true)
    }
    if (!approval) {
      setMessage('Your profile will be deleted')
      setShowBtn(true)
    }
  }

  useEffect(() => {
    if (status || approval) {
      console.log(status)
      console.log(approval)
      axios
        .delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
        .then((res) => {
          console.log(res)

          axios
            .delete(`${process.env.REACT_APP_API_URL}/events/${user.id}`)
            .then((res) => {
              console.log(res)
              axios
                .delete(
                  `${process.env.REACT_APP_API_URL}/properties/${user.id}`
                )
                .then((res) => {
                  console.log(res)
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log(status)
      console.log(approval)
      setShowBtn(false)
    }
  }, [status, approval])

  return (
    <div>
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />
      <section>
        {/* <h2>Profile page !!!</h2> */}
        <h1>{message} </h1>
        <button onClick={(e) => handleDelete(e)}>Delete profile</button>
        {showBtn ? (
          <div>
            <button onClick={() => setStatus(true)}>
              Do you want to continue?
            </button>
            <button onClick={() => setStatus(false)}>I want to stay</button>
          </div>
        ) : (
          ''
        )}
      </section>
    </div>
  )
}

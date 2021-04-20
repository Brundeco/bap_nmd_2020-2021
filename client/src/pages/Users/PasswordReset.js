import React, { useState, useEffect } from 'react'
import { InputField, PreloaderSpinningWheel } from '../../components'
import axios from 'axios'

export default ({ match }) => {
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [progress, setProgress] = useState(false)
  const [username, setUsername] = useState()

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = match.params.token
    console.log(token)

    await axios
      .get(`${process.env.REACT_APP_API_URL}/users/password-reset/${token}`)
      .then((res) => {
        if (res.data.message === 'Valid reset link') {
          setUsername(res.data.username)
        }
      })
      .catch((err) => {
        console.log(err.message)
        setStatus(err.message)
      })
  }

  useEffect(async () => {
    console.log('here')
    if (username) {
      console.log(username)
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/users/password-reset/${username}/${data.password}`
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err.message)
          setStatus(err.message)
        })
    }
  }, [username])

  return (
    <div className="login-screen padding-correction">
      <div className={progress ? 'await-result show' : 'await-result hide'}>
        {progress ? (
          <PreloaderSpinningWheel text="Sending mail to server" />
        ) : (
          ''
        )}
      </div>
      <div className="wrapper">
        <h1>Reset password </h1>
        <form action="" onSubmit={handleSubmit}>
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
          />
          <InputField
            name="passwordVerify"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
          />
          <button className="main-btn" onClick={handleSubmit}>
            Reset password
          </button>
        </form>
        <button
          className="secondary-btn"
          onClick={() => (window.location = '/login')}
        >
          Back to login
        </button>
        <span> {status} </span>
      </div>
    </div>
  )
}

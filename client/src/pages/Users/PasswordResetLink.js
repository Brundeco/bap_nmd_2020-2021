import React, { useState, useEffect } from 'react'
import { InputField, PreloaderSpinningWheel } from '../../components'
import axios from 'axios'

export default () => {
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [progress, setProgress] = useState(false)

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    // setProgress(true)

    axios
      .post(`${process.env.REACT_APP_API_URL}/users/password-reset-link`, {
        email: data.email,
      })
      .then((res) => {
        setStatus('Password reset link send!')
        console.log(res)
      })
      .catch((err) => {
        console.log(err.message)
        setStatus(err.message)
      })
  }

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
        <h1>Reset password</h1>
        <form action="" onSubmit={handleSubmit}>
          <InputField
            name="email"
            placeholder="Email"
            type="email"
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

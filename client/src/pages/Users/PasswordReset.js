import React, { useState, useEffect } from 'react'
import { InputField, PreloaderSpinningWheel } from '../../components'
import axios from 'axios'

export default ({ match }) => {
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [progress, setProgress] = useState(false)

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // setProgress(true)

    const token = match.params.token
    console.log(token)

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/password-update/${token}`)
      .then((res) => {
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
            name="password"
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

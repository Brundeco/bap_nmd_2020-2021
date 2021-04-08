import React, { useState, useEffect } from 'react'
import {
  InputField,
  CheckSession,
  PreloaderSpinningWheel,
} from '../../components'
import axios from 'axios'
import queryString from 'query-string'
import { useLocation } from 'react-router'

export default () => {
  localStorage.clear()
  const location = useLocation()
  const email = queryString.parse(location.search).email
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [progress, setProgress] = useState(false)

  useEffect(() => {
    const input = document.querySelectorAll("input[type='password']")[0]
    if (email) {
      input.focus()
      setData((prev) => ({ ...prev, email }))
    }
  }, [])

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
    console.log(data)
  }

  const handleSubmit = (e) => {
    setStatus('')
    setProgress(true)
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, data)
      .then((res) => {
        setProgress(false)
        setStatus(res.data.message)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('jwt', res.data.token)
        localStorage.setItem('askLocation', true)
        if (CheckSession(res.data.token)) window.location = '/'
      })
      .catch((err) => {
        setProgress(false)
        setStatus(err.response?.data?.message)
      })
  }

  return (
    <div className="login-screen full-screen">
      <div className={progress ? 'await-result show' : 'await-result hide'}>
        {progress ? <PreloaderSpinningWheel text="Logging in" /> : ''}
      </div>
      <div className="wrapper">
        <h1>Sign in to suitswap</h1>
        <form action="" onSubmit={handleSubmit}>
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="main-input-field"
            value={data?.email ? data?.email : email}
            required
          />

          <InputField
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="main-input-field"
            required
          />
          <button className="main-btn" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <button
          className="secondary-btn"
          onClick={() => (window.location = '/register')}
        >
          Not a member yet? / Sign up here
        </button>
        {status == 'Login successfull' ? (
          <span className="success"> {status} </span>
        ) : (
          <span className="failure"> {status} </span>
        )}
      </div>
    </div>
  )
}

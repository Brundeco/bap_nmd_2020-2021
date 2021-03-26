import React, { useState, useEffect } from 'react'
import {
  InputField,
  CheckSession,
  PreloaderSpinningWheel,
} from '../../components'
import axios from 'axios'
import TextLogo from './../../icons/text_logo.svg'
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
      .post('http://localhost:5000/users/login', data)
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
        setStatus(err.response.data.message)
      })
  }

  return (
    <div className="login-screen full-screen">
      <div className={progress ? 'await-result show' : 'await-result hide'}>
        {progress ? <PreloaderSpinningWheel text="Logging in" /> : ''}
      </div>
      <div className="wrapper">
        {/* <img src={TextLogo} alt="Suitswap logo" className="logo" /> */}
        <h1>Sign in to suitswap</h1>
        <form action="" onSubmit={handleSubmit}>
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="main-input-field"
            value={email || data.email}
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
          <input className="main-btn" type="submit" value="Login" />
        </form>
        <button onClick={() => (window.location = '/register')}>
          Not a member yet? / Sign up here
        </button>
        <h5> {status} </h5>
      </div>
    </div>
  )
}

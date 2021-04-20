import React, { useState, useEffect } from 'react'
import { InputField, CheckSession, Preloader } from '../../components'
import axios from 'axios'
import queryString from 'query-string'
import { useLocation } from 'react-router'

export default () => {
  localStorage.clear()
  const location = useLocation()
  const email = queryString.parse(location.search).email
  const [data, setData] = React.useState({ email: '', password: '' })
  const [status, setStatus] = useState()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const input = document.querySelectorAll("input[type='password']")[0]
    if (email) {
      input.focus()
      setData((prev) => ({ ...prev, email }))
    }
  }, [])

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    setStatus('')
    setLoading(true)
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, data)
      .then((res) => {
        setSuccess(true)
        setLoading(false)
        setStatus(res.data.message)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('jwt', res.data.token)
        if (CheckSession(res.data.token)) window.location = '/'
      })
      .catch((err) => {
        setLoading(false)
        setStatus(err.response?.data?.message)
      })
  }

  return (
    <div className="login-screen full-screen">
      {loading ? <Preloader text="Logging in" /> : ''}
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
        <button
          className="secondary-btn"
          onClick={() => (window.location = '/password-reset-link')}
        >
          Forgot password
        </button>
        <span className={success ? 'status-success' : 'status-failure'}>
          {status}
        </span>
      </div>
    </div>
  )
}

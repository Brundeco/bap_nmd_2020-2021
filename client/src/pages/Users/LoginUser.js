import React, { useState, useEffect } from 'react'
import { InputField, CheckSession, Preloader } from '../../components'
import axios from 'axios'
import queryString from 'query-string'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

export default () => {
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
        <h1>Sign in to Popapp</h1>
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
        <Link
          className="secondary-btn mg-top-none"
          to={{ pathname: '/register', state: { from: 'root' } }}
        >
          Sign up
        </Link>

        <Link
          className="simple-btn"
          to={{ pathname: '/password-reset-link', state: { from: 'root' } }}
        >
          Forgot password
        </Link>
        <span className={success ? 'status-success' : 'status-failure'}>
          {status}
        </span>
      </div>
    </div>
  )
}

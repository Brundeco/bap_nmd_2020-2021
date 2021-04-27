import React, { useState, useEffect } from 'react'
import { InputField, Preloader } from '../../components'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default ({ match }) => {
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(false)
  const [username, setUsername] = useState()

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (data?.password?.length > 5 && data.password === data.passwordVerify) {
      setPasswordsMatch(true)
    } else {
      setPasswordsMatch(false)
    }
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = match.params.token

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
    if (username) {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/users/password-reset/${username}/${data.password}`
        )
        .then((res) => {
          setSuccess(true)
          setLoading(false)
          setStatus(res.data.message)
          console.log(res)
          window.location = '/login'
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.message)
          setStatus(err.message)
        })
    }
  }, [username])

  return (
    <div className="login-screen padding-correction">
      {loading ? <Preloader text="Logging in" /> : ''}
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
          <button
            className={passwordsMatch ? 'main-btn' : 'main-btn disabled-btn'}
            onClick={handleSubmit}
          >
            Reset password
          </button>
        </form>

        <Link
          className="secondary-btn"
          to={{ pathname: '/login', state: { from: 'root' } }}
        >
          Back to login
        </Link>
        <span className={success ? 'status-success' : 'status-failure'}>
          {status}
        </span>
      </div>
    </div>
  )
}

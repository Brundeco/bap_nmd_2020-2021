import React, { useState } from 'react'
import { InputField, Preloader } from '../../components'
import axios from 'axios'

export default () => {
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(false)
  // const [success, setSuccess] = useState(false)
  const [preloaderMsg, setPreloaderMsg] = useState('Preparing reset link')
  const [updatePreloader, setUpdatePreloader] = useState('false')

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    axios
      .post(`${process.env.REACT_APP_API_URL}/users/password-reset`, {
        email: data.email,
      })
      .then((res) => {
        console.log(res)
        setUpdatePreloader(true)
        setPreloaderMsg('You have mail! 💌')
        setTimeout(function () {
          setLoading(false)
        }, 3000)
      })
      .catch((err) => {
        console.log(err.message)
        setUpdatePreloader(true)
        setPreloaderMsg('Something went wrong... 😒')
        setTimeout(function () {
          setLoading(false)
        }, 3000)
        // setStatus('Password reset link could not be send')
        setLoading(false)
      })
  }

  return (
    <div className="login-screen padding-correction">
      {loading ? (
        <Preloader text={preloaderMsg} update={updatePreloader} />
      ) : (
        ''
      )}
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
        {/* <span className={success ? 'status-success' : 'status-failure'}>
          {status}
        </span> */}
      </div>
    </div>
  )
}

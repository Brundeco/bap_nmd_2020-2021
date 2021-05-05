import React, { useState } from 'react'
import { InputField, Preloader } from '../../components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default () => {
  const [data, setData] = React.useState({})
  const [loading, setLoading] = useState(false)
  const [preloaderMsg, setPreloaderMsg] = useState('Preparing reset link')
  const [updatePreloader, setUpdatePreloader] = useState('false')
  let history = useHistory()

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
      .then(() => {
        setUpdatePreloader(true)
        setPreloaderMsg('You have mail! 💌')
        setTimeout(function () {
          setLoading(false)
        }, 3000)
      })
      .catch(() => {
        setUpdatePreloader(true)
        setPreloaderMsg('Something went wrong...')
        setTimeout(function () {
          setLoading(false)
        }, 3000)
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
            Send link
          </button>
        </form>
        <button
          className="secondary-btn mg-top-none"
          onClick={() => history.goBack()}
        >
          Back
        </button>
      </div>
    </div>
  )
}

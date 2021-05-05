import React, { useState, useEffect } from 'react'
import { InputField, Preloader } from './../../components'
import FileBase from 'react-file-base64'
import axios from 'axios'
import SelectImage from './../../icons/add-img.svg'
import replaceImage from './../../icons/reload.svg'
import { Link } from 'react-router-dom'

export default () => {
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    if (data.password !== data.passwordRepeat) {
      setLoading(false)
      setStatus('Passwords do not match')
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/register`, data)
        .then((res) => {
          setSuccess(true)
          setLoading(false)
          setStatus(res.data.message)
          window.location = '/login?email=' + res.data.user.email
        })
        .catch((err) => {
          setLoading(false)
          setStatus(err.response.data.message)
        })
    }
  }

  return (
    <div className="login-screen padding-correction">
      {loading ? <Preloader text="Logging in" /> : ''}
      <div className="wrapper">
        <h1>Create account</h1>
        <form action="" onSubmit={handleSubmit}>
          <div></div>

          <InputField
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            required
          />
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />

          <InputField
            name="firstname"
            placeholder="Firstname"
            type="text"
            onChange={handleChange}
            required
          />
          <InputField
            name="lastname"
            placeholder="Lastname"
            type="text"
            onChange={handleChange}
            required
          />

          <InputField
            name="phone"
            placeholder="Phone"
            type="text"
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
          <InputField
            name="passwordRepeat"
            placeholder="Repeat password"
            type="password"
            onChange={handleChange}
            required
          />

          <h6>
            {data?.image
              ? 'Click again to replace your image'
              : 'Choose your image (not required)'}
          </h6>
          <div className="file-upload-cta">
            <FileBase
              className="hide-std-file-btn"
              type="file"
              multiple={false}
              onDone={({ base64 }) => setData({ ...data, image: base64 })}
            />
            <button
              id="show-custom-file-btn"
              className={data?.image ? 'without-border' : ''}
            >
              {!data?.image ? (
                <img src={SelectImage} className="upload-icons" alt="" />
              ) : (
                <img src={replaceImage} alt="" className="upload-icons" />
              )}
              {data?.image ? (
                <img
                  src={data?.image}
                  className={data?.image ? 'userphoto-register' : ''}
                  alt=""
                />
              ) : (
                ''
              )}
            </button>
          </div>
          <button className="main-btn mg-top-std" onClick={handleSubmit}>
            Register
          </button>
        </form>

        <Link
          className="simple-btn"
          to={{ pathname: '/login', state: { from: 'root' } }}
        >
          Already a member? / Login here
        </Link>
        <span className={success ? 'status-success' : 'status-failure'}>
          {status}
        </span>
      </div>
    </div>
  )
}

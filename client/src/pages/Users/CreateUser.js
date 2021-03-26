import React, { useState, useEffect } from 'react'
import { InputField, PreloaderSpinningWheel } from './../../components'
import FileBase from 'react-file-base64'
import axios from 'axios'
import TextLogo from './../../icons/text_logo.svg'
import SelectImage from './../../icons/add-img.svg'
import replaceImage from './../../icons/reload.svg'

export default () => {
  const [data, setData] = React.useState({})
  const [status, setStatus] = useState()
  const [progress, setProgress] = useState(false)

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProgress(true)
    if (data.password !== data.passwordRepeat) {
      setStatus('Passwords do not match')
    } else {
      axios
        .post('http://localhost:5000/users/register', data)
        .then((res) => {
          setProgress(false)
          setStatus(res.data.message)
          window.location = '/login?email=' + res.data.user.email
        })
        .catch((err) => {
          setProgress(false)
          setStatus(err.response.data.message)
        })
    }
  }

  return (
    <div className="login-screen padding-correction">
      <div className={progress ? 'await-result show' : 'await-result hide'}>
        {progress ? <PreloaderSpinningWheel text="Registering account" /> : ''}
      </div>
      <div className="wrapper">
        {/* <img src={TextLogo} alt="Suitswap logo" className="logo" /> */}
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
            name="phone"
            placeholder="Phone"
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
              {/* <img src={SelectImage} alt="" /> */}
              {data?.image ? (
                // <div>
                <img
                  src={data?.image}
                  className={data?.image ? 'userphoto-register' : ''}
                  alt=""
                />
              ) : (
                // </div>
                ''
              )}
              {/* <span>
                {data?.image ? 'Replace picture' : 'Choose your profile image'}
              </span> */}
            </button>
          </div>
          {/* <div>
            {data?.image ? (
              <img
                src={data?.image}
                className={data?.image ? 'userphoto-register' : ''}
                alt=""
              />
            ) : (
              ''
            )}
          </div> */}
          <input
            className="main-btn register-btn"
            type="submit"
            value="Register"
          />
        </form>
        <button onClick={() => (window.location = '/login')}>
          Already a member? / Login here
        </button>
        <h5> {status} </h5>
      </div>
    </div>
  )
}

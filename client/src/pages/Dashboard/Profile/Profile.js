import React, { useState, useEffect } from 'react'
import {
  Header,
  InputField,
  Preloader,
  CheckSession,
} from '../../../components'
import {
  // deleteMessages,
  // deleteProperties,
  // deleteEvents,
  // deleteUser,
  deleteUserContent,
} from '../../../functions/DeleteUserContent'
import axios from 'axios'
import FileBase from 'react-file-base64'
import SelectImage from './../../../icons/add.svg'
import replaceImage from './../../../icons/reload.svg'
import { Link } from 'react-router-dom'

export default () => {
  CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [data, setData] = useState(user)
  const [loading, setLoading] = useState(false)
  const [preloaderMsg, setPreloaderMsg] = useState()

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    if (!status) {
      setShowBtn(true)
    }
  }

  const handleStatus = (state) => {
    setStatus(state)
    setShowBtn(state)
    if (state) {
      deleteUserContent(user.id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setPreloaderMsg('Saving updates ...')
    axios
      .put(`${process.env.REACT_APP_API_URL}/users/${user?.id}`, data)
      .then((res) => {
        console.log(res)
        setPreloaderMsg('Succesful!')
        setTimeout(function () {
          setLoading(false)
        }, 3000)
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="profile-screen create-product-screen">
      {loading ? <Preloader text={preloaderMsg} /> : ''}
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />

      <section className="about-user">
        <div className="wrapper">
          <img className="user-image" src={user?.image} alt="user-image" />
          <h2 className="main-title">
            {`${user?.firstname} ${user?.lastname}`}{' '}
          </h2>
        </div>
      </section>

      <section className={showForm ? 'show-block-auto' : 'hide'}>
        <h2 className="main-title">Update your profile</h2>

        <form className="update-user-form">
          <div className="form-row">
            <div className="form-col-md">
              <InputField
                name="username"
                placeholder="Username"
                type="text"
                onChange={handleChange}
                value={data?.username ? data?.username : user?.username}
                required
              />
            </div>
            <div className="form-col-md">
              <InputField
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                value={data?.email ? data?.email : user?.email}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col-md">
              <InputField
                name="firstname"
                placeholder="Firstname"
                type="text"
                onChange={handleChange}
                value={data?.firstname ? data?.firstname : user?.firstname}
                required
              />
            </div>
            <div className="form-col-md">
              <InputField
                name="lastname"
                placeholder="Lastname"
                type="text"
                onChange={handleChange}
                value={data?.lastname ? data?.lastname : user?.lastname}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col-md">
              <InputField
                name="phone"
                placeholder="Phone"
                type="text"
                onChange={handleChange}
                value={data?.phone ? data?.phone : user?.phone}
                required
              />
            </div>
          </div>

          <section className="flex-col flex-j-center flex-a-center">
            <h2 className="main-title">image</h2>
            {data?.image ? <p className="alert">Click image to delete</p> : ''}
            <div className="file-upload-cta fit edit">
              <FileBase
                className="hide-std-file-btn"
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setData({
                    ...data,
                    image: base64,
                  })
                }
              />

              <button id="show-custom-file-btn-edited">
                <img
                  src={data?.image ? replaceImage : SelectImage}
                  className="upload-icons"
                  alt=""
                />
              </button>
            </div>
            <img
              src={data?.image}
              className={data?.image ? 'user-image-preview wallphoto' : ''}
              alt={data?.image ? '' : ''}
              onClick={() =>
                setData({
                  ...data,
                  image: '',
                })
              }
            />
          </section>

          <div className="flex flex-j-center full-width">
            <button className="secondary-btn fix" onClick={handleSubmit}>
              Save updates
            </button>

            <button className="main-btn fix" onClick={() => setShowForm(false)}>
              Close form
            </button>
          </div>
        </form>
      </section>

      {!showForm ? (
        <section className="flex flex-j-center">
          <button className="main-btn fix" onClick={() => setShowForm(true)}>
            Update profile
          </button>
        </section>
      ) : (
        ''
      )}

      {!showForm ? (
        <section className="cta-bottom flex flex-j-center">
          <Link
            className="secondary-btn fix"
            to={{ pathname: '/password-reset-link', state: { from: 'root' } }}
          >
            Reset password
          </Link>
          <button className="danger-btn fix" onClick={(e) => handleDelete(e)}>
            Delete profile
          </button>
        </section>
      ) : (
        ''
      )}

      {showBtn ? (
        <div className="appprove-delete">
          <div className="wrapper">
            <h2 className="main-title">Are you sure?</h2>
            <p>
              We feel sorry to see you leave. <br />
              If you continue, your profile together with all your content will
              be deleted.
            </p>
            <button
              className="danger-btn fix"
              onClick={() => handleStatus(true)}
            >
              Yes continue
            </button>
            <button
              className="main-btn fix"
              onClick={() => handleStatus(false)}
            >
              No I want to stay
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

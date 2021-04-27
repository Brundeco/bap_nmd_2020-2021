import axios from 'axios'

export const deleteMessages = async (id) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/messages/${id}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteProperties = async (id) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/properties/${id}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteEvents = async (id) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/events/${id}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteUser = async (id) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

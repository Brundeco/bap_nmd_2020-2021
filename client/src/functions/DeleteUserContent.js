import axios from 'axios'

export const deleteUserContent = async (id) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/messages/${id}`)
    .then(() => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/properties/${id}`)
        .then(() => {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/events/${id}`)
            .then(() => {
              axios
                .delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
                .then(() => {
                  localStorage.clear()
                  window.location = '/login'
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

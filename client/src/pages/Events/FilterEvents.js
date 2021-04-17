import axios from 'axios'

export const filterPrice = () => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/events/filter/most-recent`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
}

export const filterMostRecent = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/events/filter/most-recent`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
}

export const filterLessRecent = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/events/filter/less-recent`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
}

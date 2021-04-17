import axios from 'axios'

export const filterPriceAsc = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/properties/filter/price-asc`)
    .then(async (res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterPriceDesc = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/properties/filter/price-desc`)
    .then(async (res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterPriceRange = async (priceRange) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/properties/filter/price-range`, {
      priceRange,
    })
    .then(async (res) => {
      const data = res.data
      console.log(res.data)
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterMostRecent = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/properties/filter/most-recent`)
    .then((res) => {
      res.data.map((el) =>
        console.log(new Date(el.createdAt).toLocaleTimeString())
      )
      console.log(res.data)
      return res
    })
    .catch((err) => {
      return err
    })
}

export const filterLessRecent = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/properties/filter/less-recent`)
    .then((res) => {
      res.data.map((el) =>
        console.log(new Date(el.createdAt).toLocaleTimeString())
      )
      console.log(res.data)
      return res
    })
    .catch((err) => {
      return err
    })
}

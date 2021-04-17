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
  console.log(priceRange)
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
  console.log('Most recent')
  return axios
    .get(`${process.env.REACT_APP_API_URL}/properties/filter/most-recent`)
    .then((res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterLessRecent = async () => {
  console.log('Less recent')

  return axios
    .get(`${process.env.REACT_APP_API_URL}/properties/filter/less-recent`)
    .then((res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

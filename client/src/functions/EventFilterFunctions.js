import axios from 'axios'

export const filterMostRecent = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/events/filter/most-recent`)
    .then((res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterLessRecent = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/events/filter/less-recent`)
    .then((res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterGetAutocomplete = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/events/filter/get/autocomplete`)
    .then((res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterPostAutocomplete = async (search) => {
  console.log(search)
  return axios
    .post(`${process.env.REACT_APP_API_URL}/events/filter/post/autocomplete`, {
      search,
    })
    .then((res) => {
      const data = res.data
      return data
    })
    .catch((err) => {
      return err
    })
}

export const filterDateRange = async (dateRange) => {
  const startDate = new Date(dateRange.startDate).getTime()
  const endDate = new Date(dateRange.endDate).getTime()
  let newArray = []

  axios
    .get(`${process.env.REACT_APP_API_URL}/events`)
    .then((res) => {
      let uniques // declare here
      res.data.events.map((item) => {
        item.dates.map((date) => {
          const evtDate = new Date(date).getTime()
          if (evtDate >= startDate && evtDate <= endDate) {
            newArray.push(item)
            uniques = [...new Set(newArray)]
            // console.log(uniques)
            // return uniques
          }
        })
      })
      return uniques // return here
    })
    .catch((err) => {
      return err
    })
}

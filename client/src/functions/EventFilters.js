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

// export const filterDateRange = async (dateRange) => {
//   const startDate = new Date(dateRange.startDate).getTime()
//   const endDate = new Date(dateRange.endDate).getTime()
//   let newArray = []

//   const fetchedEvents = await axios.get(
//     `${process.env.REACT_APP_API_URL}/events`
//   )
//   console.log(fetchedEvents)

//   const promises = await Promise.all(
//     fetchedEvents?.map(async (el) => await secondFunction(el.id))
//   )

//     .then((res) => {
//       res.data.events.map((item) => {
//         item.dates.map((date) => {
//           const evtDate = new Date(date).getTime()
//           if (evtDate >= startDate && evtDate <= endDate) {
//             newArray.push(item)
//             let uniques = [...new Set(newArray)]
//             console.log(uniques)
//             return uniques
//           }
//         })
//       })
//     })
//     .catch((err) => {
//       return err
//     })
// }

export const filterDateRange = async (dateRange) => {
  const startDate = new Date(dateRange.startDate).getTime()
  const endDate = new Date(dateRange.endDate).getTime()
  let newArray = []

  return axios
    .get(`${process.env.REACT_APP_API_URL}/events`)
    .then((res) => {
      res.data.events.map((item) => {
        item.dates.map((date) => {
          const evtDate = new Date(date).getTime()
          if (evtDate >= startDate && evtDate <= endDate) {
            newArray.push(item)
            let uniques = [...new Set(newArray)]
            console.log(uniques)
            return uniques
          }
        })
      })
    })
    .catch((err) => {
      return err
    })
}

import jwt from 'jsonwebtoken'

export default (jwt_token) => {
  const user = localStorage.getItem('user')
  if (!user) {
    console.log('no user')
    window.location = '/login'
  } else {
    try {
      jwt.verify(jwt_token, process.env.REACT_APP_TOKEN_SECRET)
      return true
    } catch (error) {
      window.location = '/login'
      return false
    }
  }
}

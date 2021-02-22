import jwt from "jsonwebtoken";

export default (jwt_token) => {
  try {
    jwt.verify(jwt_token, process.env.REACT_APP_TOKEN_SECRET);
    return true;
  } catch (error) {
    window.location = "/expired";
    return false;
  }
};

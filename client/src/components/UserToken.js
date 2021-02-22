
export default (jwt_token) => {
  console.log(jwt_token);
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   console.log(user);

  //   if (user) {
  //     axios
  //       .post("http://localhost:5000/users/login", {
  //         user: "",
  //         password: "",
  //       })
  //       .then((res) => {
  //         CheckSession(res.data.token, "/");
  //         localStorage.setItem("user", JSON.stringify(res.data.user));
  //       })
  //       .catch((err) => setStatus(err.response.data.message));
  //   } else {
  //     console.log("No user in local storage");
  //   }
  //   return null;
};

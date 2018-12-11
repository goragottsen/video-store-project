const axios = require('axios');

module.exports = {

  // This function is left commented intentionally to demo the process of admin creation for the following test

  // createAdmin(login, password) {
  //   const admin = {
  //     login: login,
  //     password: password
  //   };

  //   return axios
  //     .post('http://localhost:3000/api/admin/signup', admin)
  //     .then(res => res.data)
  //     .catch(error => console.log());
  // },

  isAdmin (login, password) {
    const admin = {
      login: login,
      password: password
    };

    return axios
      .post('http://localhost:3000/api/admin/login', admin)
      .then(res => res.data)
      .catch(error => console.log());
  },

  getVideos(pageSize, currentPage) {
    return axios.get(`http://localhost:3000/api/videos?pageSize=${pageSize}&currentPage=${currentPage}`)
    .then(res => res.data)
    .catch(error => console.log());
  },

  getCustomers(pageSize, currentPage) {
    return axios.get(`http://localhost:3000/api/customers?pageSize=${pageSize}&currentPage=${currentPage}`)
    .then(res => res.data)
    .catch(error => console.log());
  }
}

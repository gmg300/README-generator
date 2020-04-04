require("dotenv").config({ path: "../.env" });
const axios = require("axios");

const api = {
  getUser(username) {
    const queryURL = `https://api.github.com/users/${username}`;
    const token = process.env.TOKEN;
    const config = {
      // https://hackernoon.com/how-to-use-environment-variables-keep-your-secret-keys-safe-secure-8b1a7877d69c
      // https://github.com/motdotla/dotenv
      // https://stackoverflow.com/questions/44078900/github-api-fetching-user-email
      // https://www.youtube.com/watch?v=17UVejOw3zA
      headers: { Authorization: "token " + token }
    };
    return axios
      .get(queryURL, config)
      .then(function(res) {
        // console.log(res.data);
        const userData = {
          name: res.data.name,
          login: res.data.login,
          profileImg: res.data.avatar_url,
          email: res.data.email,
          website: res.data.blog
        };
        return userData;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = api;
require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const chalk = require("chalk");

const api = {
  getUser(username) {
    const queryURL = `https://api.github.com/users/${username}`;
    const token = process.env.TOKEN;
    const config = {
      // https://hackernoon.com/how-to-use-environment-variables-keep-your-secret-keys-safe-secure-8b1a7877d69c
      // https://github.com/motdotla/dotenv
      // https://stackoverflow.com/questions/44078900/github-api-fetching-user-email
      // https://www.youtube.com/watch?v=17UVejOw3zA
      headers: { Authorization: "token " + token },
    };
    const data = async () => {
      try {
        const res = await axios.get(queryURL, config);
        const user = {
          name: res.data.name,
          login: res.data.login,
          profile: res.data.html_url,
          profileImg: res.data.avatar_url,
          email: res.data.email,
        };
        return user;
      } catch (err) {
        console.log(chalk.red("Error: Please enter a valid Github username"));
      }
    };
    return data();
  },
};

module.exports = api;

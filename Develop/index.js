// LOAD NODE PACKAGES
const fs = require("fs");
const inquirer = require("inquirer");
const api = require("./utils/api");
const markdown = require("./utils/generateMarkdown");

// SET QUESTIONS
const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter a Github username:"
  },
  {
    type: "input",
    name: "title",
    message: "Project Title:"
  }
];

function writeToFile(fileName, data) {
  
}

async function init() {
  const answers = await inquirer.prompt(questions);
  const user = await api.getUser(answers.username);
  const data = {
    user,
    title: answers.title,
  };
  // console.log(data);
  const content = generateMarkdown(data);



  
  

  



}

init();

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
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description for your project:"
  },
  {
    type: "input",
    name: "badges",
    message: "What technology did you use in this project"
  },
  {
    type: "input",
    name: "installation",
    message: "How do users install your app?"
  },
  {
    type: "input",
    name: "usage",
    message: "How does your app work?"
  },
  {
    type: "input",
    name: "contributing",
    message: "How can others contribute to your project?"
  },
  {
    type: "input",
    name: "tests",
    message: "Can you describe any tests run for this project?"
  },
  {
    type: "input",
    name: "credits",
    message: "Who else worked on this (enter github username), did you use any third party apps or videos?"
  },
  {
    type: "input",
    name: "license",
    message: "How would you like to license your project?"
  },

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

  writeToFile("README", content);
}

init();

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
    message: "What technology did you use in this project(separate multiple answers with a comma and space)"
  },
  {
    type: "input",
    name: "installation",
    message: "How do users install your app?"
  },
  {
    type: "input",
    name: "link",
    message: "Enter the link to your live app:"
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
    name: "userCredits",
    message: "Who else worked on this (enter github username)?"
  },
  {
    type: "input",
    name: "techCredits",
    message: "What kind of third party libraries did you use?"
  },
  {
    type: "input",
    name: "license",
    message: "How would you like to license your project?"
  },

];

// DATA MODEL
function Data(options) {
  this.defaults = {
    title: "Project Title",
    description: "This is a default description for my awesome project, I must have forgot to fill it in when I was generating my README!",
    badges: {
      label: "awesome",
      message: "100%",
      color: "color"
    },
    installation: "No complicated installation for this project, just use the link to the live page.",
    link: "",
    usage: "This project is so easy to use I didn't include any other instructions.",
    contributing: "",
    tests: "",
    userCredits: "",
    techCredits: "",
    license: "MIT License"
  },
  Object.keys(this.defaults).forEach(key => this[key]= options[key] || this.defaults[key]); 

    
}

function writeToFile(fileName, data) {

}

async function init() {
  // GET USER INPUTS
  const answers = await inquirer.prompt(questions);
  // console.log(answers);
  // CONSTRUCT DATA FROM INPUTS
  const data = new Data({
    title: answers.title,
    description: answers.description,
    badges: answers.badges.split(', '),
    installation: answers.installation,
    link: answers.link,
    usage: answers.usage,
    contributing: answers.contributing,
    tests: answers.tests,
    userCredits: answers.userCredits.split(', '),
    techCredits: answers.techCredits.split(', '),
    license: answers.license
  });
  data.user = await api.getUser(answers.username);
  // console.log(data);
  writeToFile("README", markdown(data));
}

init();

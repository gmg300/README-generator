// LOAD NODE PACKAGES
const fs = require("fs");
const inquirer = require("inquirer");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

// QUESTIONS ARRAY
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
    type: "list",
    name: "license",
    message: "How would you like to license your project?",
    choices: ["MIT", "Apache 2.0", "GNU GPLv3", "GNU GPLv2", "GNU LGPLv2.1", "BSD 3-Clause", "BSD 2-Clause", "Eclipse Public License 1.0", "ISC", "Mozilla Public License 2.0", "IBM Public License Version 1.0", "The Unlicense"]
  }
];

// DATA MODEL
function Data(options) {
  this.defaults = {
    title: "Project Title",
    description: "This is a default description for my awesome project, I must have forgot to fill it in when I was generating my README!",
    installation: "No complicated installation for this project, just use the link to the live page.",
    link: "",
    usage: "This project is so easy to use I didn't include any other instructions.",
    contributing: "",
    tests: "",
    userCredits: "",
    techCredits: "",
    license: "MIT"
  },
  Object.keys(this.defaults).forEach(key => this[key]= options[key] || this.defaults[key]); 

    
}

function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data);
}

async function init() {
  // GET USER INPUTS
  const answers = await inquirer.prompt(questions);
  // console.log(answers);
  const licenseBadge = function(answers) {
    switch(answers.license) {
      case "MIT":
        return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
      case "Apache 2.0":
        return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
      case "GNU GPLv3":
        return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
      case "GNU GPLv2":
        return '[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
      case "GNU LGPLv3":
        return '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
      case "BSD 3-Clause":
        return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
      case "BSD 2-Clause":
        return '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)';
      case "Eclipse Public License 1.0":
        return '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
      case "ISC":
        return '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
      case "Mozilla Public License 2.0":
        return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
      case "IBM Public License Version 1.0":
        return '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)';
      default:
        return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
      }
  }
  // CONSTRUCT DATA FROM INPUTS
  const data = new Data({
    title: answers.title,
    description: answers.description,
    installation: answers.installation,
    link: answers.link,
    usage: answers.usage,
    contributing: answers.contributing,
    tests: answers.tests,
    userCredits: answers.userCredits.split(', '),
    techCredits: answers.techCredits.split(', '),
    license: licenseBadge(answers)
  });
  data.user = await api.getUser(answers.username);
  // console.log(data);
  const md = generateMarkdown(data);
  writeToFile("README.md", md);
}

init();

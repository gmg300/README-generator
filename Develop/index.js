// LOAD NODE PACKAGES
const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

// QUESTIONS ARRAYS
// Validation - https://github.com/sameeri/Code-Inquirer/wiki/Asking-questions-away-with-Inquirer!
// URL encoding - https://stackoverflow.com/questions/12141251/how-can-i-replace-space-with-20-in-javascript
// Filtering and general documentation - https://github.com/SBoudrias/Inquirer.js/#questions
// Validate API response - https://gitter.im/SBoudrias/Inquirer.js?at=548940cb7ed2ba7b10c0e209
const questions = [
  {
    type: "input",
    name: "title",
    message: "Project Title:",
    validate: function validateTitle(input) {
      return input !== "";
    },
  },
  {
    type: "input",
    name: "description",
    message: "Project Description:",
    default: "This is a default description for my awesome project!",
  },
  {
    type: "input",
    name: "installation",
    message: "Installation instructions:",
    default: "",
  },
  {
    type: "input",
    name: "link",
    message: "Link to live app:",
    default: "",
  },
  {
    type: "input",
    name: "usage",
    message: "Usage instructions:",
    default:
      "This project is so easy to use I didn't include any other instructions.",
  },
  {
    type: "input",
    name: "contributing",
    message: "Contributing instructions:",
    default: "Fork and edit to your hearts content.",
  },
  {
    type: "input",
    name: "tests",
    message: "Tests run for the project:",
    default: "There are no tests for the app at this time.",
  },
  {
    type: "input",
    name: "userCredits",
    message:
      "List Github usernames for other contributors(separate with commas):",
    default: "",
    filter: function (input) {
      // Clean input string, turn into array, turn into URL encoded .md bullet points
      if (input.trim() === "") {
        return "";
      } else {
        const users = input.split(", ");
        let credits = ``;
        users.forEach((user) => {
          user = encodeURIComponent(user.trim());
          credits += `* ${user}\n  `;
        });
        return credits;
      }
    },
  },
  {
    type: "input",
    name: "techCredits",
    message:
      "List third-party libraries or APIs this project used(separate with commas):",
    default: "",
    filter: function (input) {
      // Clean input string, turn into array, turn into URL encoded items, get random color, create badge from input
      if (input.trim() === "") {
        return "";
      } else {
        const techs = input.split(", ");
        const colors = [
          "brightgreen",
          "green",
          "yellowgreen",
          "yellow",
          "orange",
          "red",
          "blue",
          "blueviolet",
          "ff69b4",
        ];
        let credits = ``;
        techs.forEach((tech) => {
          tech = encodeURIComponent(tech.trim());
          let color = colors[Math.floor(Math.random() * colors.length + 1)];
          credits += `[![${tech}](https://img.shields.io/badge/Made%20with-${tech}-${color}.svg)]()  `;
        });
        return credits;
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license:",
    choices: [
      "MIT",
      "Apache 2.0",
      "GNU GPLv3",
      "GNU GPLv2",
      "GNU LGPLv2.1",
      "BSD 3-Clause",
      "BSD 2-Clause",
      "Eclipse Public License 1.0",
      "ISC",
      "Mozilla Public License 2.0",
      "IBM Public License Version 1.0",
      "The Unlicense",
    ],
    default: "MIT",
    filter: function (input) {
      // Find Badge with link based on user license choice
      // Badges - https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
      switch (input) {
        case "MIT":
          return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        case "Apache 2.0":
          return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        case "GNU GPLv3":
          return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        case "GNU GPLv2":
          return "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
        case "GNU LGPLv3":
          return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
        case "BSD 3-Clause":
          return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
        case "BSD 2-Clause":
          return "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
        case "Eclipse Public License 1.0":
          return "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
        case "ISC":
          return "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
        case "Mozilla Public License 2.0":
          return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
        case "IBM Public License Version 1.0":
          return "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)";
        default:
          return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      }
    },
  },
];

function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data);
  console.log(chalk.green("Created file 'README.md'"));
}

async function init() {
  // GET USERNAME AND GITHUB DATA
  // GET OTHER ANSWERS
  // https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
  const input = async () => {
    try {
      let userData;
      while (userData == undefined) {
        const user = await inquirer.prompt({
          type: "input",
          name: "name",
          message: "Enter a Github username:",
        });
        userData = await api.getUser(user.name);
      }
      const answers = await inquirer.prompt(questions);
      answers.user = userData;
      return answers;
    } catch (err) {
      console.log(chalk.red("Error"));
    }
  };
  const data = await input();
  // console.log(data);
  writeToFile("README.md", generateMarkdown(data));
}

init();

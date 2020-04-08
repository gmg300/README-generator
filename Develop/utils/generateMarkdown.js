const moment = require("moment");

function generateMarkdown(data) {
  // console.log(data);
  return `
  # ${data.title}


  ## Description
  ${data.description}

  
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Credits](#credits)
  * [License](#license)
  * [Questions](#questions)
  
  
  ## Installation
  ${data.installation}
  
  
  ## Usage
  ${data.usage}
  
  
  ## Contributing
  ${data.contributing}
  
  
  ## Tests
  ${data.tests}
  

  ## Credits
  * [${data.user.login}](${data.user.profile})
  ${data.userCredits}

  ${data.techCredits}
  
  
  ## License
  ${data.license}

  Copyright &copy;${moment().format("YYYY")} ${data.user.name} 
  
  
  ## Questions
  <img alt="Photo of ${data.user.name}" src="${data.user.profileImg}" width="25%">
  
  For questions or feedback email me at ${data.user.email}  
`;
}

module.exports = generateMarkdown;

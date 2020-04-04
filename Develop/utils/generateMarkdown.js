function generateMarkdown(data) {
  console.log(data);
  return `
  # ${data.title}


  ## Description
  
  ${data.description}  
  

  ## Badges
  
  ![badge](https://img.shields.io/badge/${data.badges.label}-${data.badges.message}-c${data.badges.color})
  
  
  ## Table of Contents
  
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Credits](#credits)
  * [License](#license)
  * [Questions](#questions)
  
  
  ## Installation
  
  ${data.installation} [${data.title}](${data.link})
  
  
  ## Usage
  
  ${data.usage}
  
  
  ## Contributing
  
  ${data.contributing}
  
  
  ## Tests
  
  ${data.tests}
  

  ## Credits
  * [${data.user.login}](${data.user.website})
  * ${data.userCredits}
  * ${data.techCredits}
  
  
  ## License
  
  ${data.license}
  
  
  ## Questions
  
  <img alt="Photo of ${data.user.name}" src="${data.user.profileImg}" width="50%">
  
  For questions or feedback email me at ${data.user.email}  
`;
}

module.exports = generateMarkdown;

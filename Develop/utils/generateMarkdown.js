function generateMarkdown(data) {
  return `
  # ${data.title}

  ## Description
  
  ## Table of Contents
  
  ## Installation
  
  ## Usage
  
  ## License
  
  ## Contributing
  
  ## Tests
  
  ## Questions
  ${data.user.profileImg}
  ${data.user.email}

`;
}

module.exports = generateMarkdown;

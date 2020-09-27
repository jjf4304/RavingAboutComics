const fs = require('fs');

// the client.html file
const index = fs.readFileSync(`${__dirname}/../pages/index.html`);
// the style.css file
const mainStyle = fs.readFileSync(`${__dirname}/../styles/mainStyles.css`);

const respond = (request, response, status, content, contentType) => {
  response.writeHead(status, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

// Serve the index page
const getIndex = (request, response) => respond(request, response, 200, index, 'text/html');

// Serve the style.css page
const getMainStyle = (request, response) => respond(request, response, 200, mainStyle, 'text/css');

// Respond to a request for a page that doesn't exist with a JSON response object.
const notFound = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page requested was not found.',
  };

  return respond(request, response, 404);
};

module.exports = {
  getIndex,
  getMainStyle,
  notFound,
};

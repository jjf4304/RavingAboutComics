const fs = require('fs');

// the client.html file
const index = fs.readFileSync(`${__dirname}/../pages/index.html`);

// const pageNotFound = fs.readFileSync(`${__dirname}/../pages/notFound.html`);

const comicListPage = fs.readFileSync(`${__dirname}/../pages/comicsList.html`);

const comicPage =  fs.readFileSync(`${__dirname}/../pages/comic.html`);

// the style.css files
const mainStyle = fs.readFileSync(`${__dirname}/../styles/mainStyles.css`);

const frontPageStyle = fs.readFileSync(`${__dirname}/../styles/frontpageStyles.css`);

const comicCardStyle = fs.readFileSync(`${__dirname}/../styles/smallComicCardStyle.css`);

const comicListStyles = fs.readFileSync(`${__dirname}/../styles/comicListStyles.css`);

const respond = (request, response, status, content, contentType) => {
  response.writeHead(status, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

// Serve the index page
const getIndex = (request, response) => respond(request, response, 200, index, 'text/html');

const getComicsList = (request, response) => respond(request, response, 200, comicListPage, 'text/html');

const getComic = (request, response) => respond(request, response, 200, comicPage, 'text/html');

// Serve the style.css page
const getMainStyle = (request, response) => respond(request, response, 200, mainStyle, 'text/css');

const getFrontPageStyle = (request, response) => respond(request, response, 200, frontPageStyle, 'text/css');

const getComicCardStyle = (request, response) => respond(request, response, 200, comicCardStyle, 'text/css');

const getComicListStyles = (request, response) => respond(request, response, 200, comicListStyles, 'text/css');

// Respond to a request for a page that doesn't exist with a JSON response object.
const notFound = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page requested was not found.',
  };

  // Change this to send a html page for 404 not found files.
  return respond(request, response, 404, JSON.stringify(responseJSON), 'application/json');
};

module.exports = {
  getIndex,
  getComicsList,
  getComic,
  getMainStyle,
  getFrontPageStyle,
  getComicCardStyle,
  getComicListStyles,
  notFound,
};

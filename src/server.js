const http = require('http');
const url = require('url');
const query = require('querystring');
const pageResponses = require('./pageResponses.js');
const comicResponses = require('./comicResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//Remember to add HEAD requests for ALL of these
const urlStruct = {
  GET: {
    '/': pageResponses.getIndex,
    '/index.html': pageResponses.getIndex,
    '/comicsList.html': pageResponses.getComicsList,
    '/comic.html': pageResponses.getComic,
    '/addComic.html': pageResponses.getAddComic,
    '/mainStyles.css': pageResponses.getMainStyle,
    '/frontpageStyles.css': pageResponses.getFrontPageStyle,
    '/smallComicCardStyle.css': pageResponses.getComicCardStyle,
    '/comicPageStyles.css': pageResponses.getComicPageStyles,
    '/comicListStyles.css': pageResponses.getComicListStyles,
    '/addComicStyles.css': pageResponses.getAddComicStyles,
    '/getComics': comicResponses.getComicData,
    notFound: pageResponses.notFound,
  },
};

const handleGET = (request, response, parsedUrl) => {
  const params = query.parse(parsedUrl.query);
  console.dir(params);

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  // If the request was a GET or HEAD request, handle it from URL struct
  // Else handle with POST request to addComic/Review
  if (request.method === 'GET' || request.method === 'HEAD') handleGET(request, response, parsedUrl);

  // else handlePOST(request, response, parsedUrl);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

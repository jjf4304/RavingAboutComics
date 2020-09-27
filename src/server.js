const http = require('http');
const url = require('url');
const query = require('querystring');
const pageResponses = require('./pageResponses.js');
const comicResponses = require('./comicResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': pageResponses.getIndex,
    '/index.html': pageResponses.getIndex,
    '/mainStyle.css': pageResponses.getMainStyle,
    notFound: pageResponses.notFound,
  },
};

const handleGET = (request, response, parsedUrl) => {
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  // If the request was a GET or HEAD request, handle it from URL struct
  // Else handle with POST request to addUser
  if (request.method === 'GET' || request.method === 'HEAD') handleGET(request, response, parsedUrl);

  else handlePOST(request, response, parsedUrl);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

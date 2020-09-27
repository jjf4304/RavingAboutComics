/* comics array of comic objects
Structure:
    top Level: "NameOfComic"
        Properties:
        -Title
        -Author
        -Publisher
        -Total Score (not sent through POST when creating new comic)
        -Cover Image URL (optional)
        -Reviews, an object
            Structure:
            Indexed by ID?
                -User (Implement later)
                -Score
                -Written Review: (optional?)
                -Review Time
*/

// ALL IMAGES ARE THE PROPERTY OF THE PUBLISHERS AND THE ARTISTS
const comics = [
  {
    title: 'Empty Zone',
    author: 'Jason Shawn Alexander',
    publisher: 'Image Comics',
    totalScore: 9,
    imgURL: 'https://cdn.imagecomics.com/assets/i/releases/19368/empty-zone-1_faf3cdff1a.jpg',
    reviews: [
      {
        score: 9,
        written: '',
        reviewTime: '',
        // user tbi
      },
    ],
  },
  {
    title: 'The Crow',
    author: 'James O\'barr',
    publisher: 'Caliber Comics',
    totalScore: 10,
    imgURL: 'https://upload.wikimedia.org/wikipedia/en/8/85/The_Crow1_Cover.jpg',
    reviews: [
      {
        score: 10,
        written: '',
        reviewTime: '',
      },
    ],
  },
  {
    title: 'Carnage, U.S.A',
    author: 'Zeb Wells',
    publisher: 'Marvel Comics',
    totalScore: 8,
    imgURL: 'https://vignette.wikia.nocookie.net/marveldatabase/images/b/bd/Carnage%2C_U.S.A._Vol_1_1.jpg',
    reviews: [
      {
        score: 8,
        written: '',
        reviewTime: '',
      },
    ],
  },
  {
    title: 'All Star Batman & Robin',
    author: 'Frank Miller',
    publisher: 'DC Comics',
    totalScore: 4,
    imgURL: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Allstarbatmanandrobin01.jpg',
    reviews: [
      {
        score: 4,
        written: '',
        reviewTime: '',
      },
    ],
  },
  {
    title: 'Red Lanterns Vol. 4: Blood Brothers',
    author: 'Charles Soule',
    publisher: 'DC Comics',
    totalScore: 7,
    imgURL: 'https://www.dccomics.com/sites/default/files/styles/covers192x291/public/gn-covers/2018/05/redlanterns_vol4_bloodbros_5b045b12a93552.91300624.jpg',
    reviews: [
      {
        score: 7,
        written: '',
        reviewTime: '',
      },
    ],
  },
];

const respondJSON = (request, response, status, json) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(json));
  response.end();
};

// const respondMeta = (request, response, status) => {
//   const headers = {
//     'Content-Type': 'application/json',
//   };

//   response.writeHead(status, headers);
//   response.end();
// };

const generateError = (id, message) => {
  const errorJson = {};

  errorJson.message = message;
  errorJson.id = id;

  return errorJson;
};

const getFrontPageData = () => {
  const top3 = {};
  if (comics.length <= 3) {
    for (let i = 0; i < comics.length; i++) {
      const json = {};
      json.title = comics[i].title;
      json.imgURL = comics[i].imgURL;
      json.topScore = comics[i].topScore;
      top3[json.title] = json;
    }
  } else {
    // Change this to sorting the comics by top score and then getting top 3
    let i = 0;
    let numAdded = 0;
    while (i < comics.length && numAdded < 3) {
      if (comics[i].totalScore >= 8) {
        const json = {};
        json.title = comics[i].title;
        json.imgURL = comics[i].imgURL;
        json.totalScore = comics[i].totalScore;
        top3[json.title] = json;
        numAdded++;
      }
      i++;
    }
  }

  //const recentReviews = {};
  // to be implemented

  const json = {};
  json.top3 = top3;
  // json.recentReviews = recentReviews;

  return json;
};

const getComic = (titleToGet) => {
  const json = {};
  for (let i = 0; i < comics.length; i++) {
    if (comics[i].title === titleToGet) {
      json.comic = comics[i];
      break;
    }
  }

  return json;
};

const getAllComics = () => {
  const json = {};

  for (let i = 0; i < comics.length; i++) {
    json[comics[i].title] = {};
    json[comics[i].title].title = comics[i].title;
    json[comics[i].title].imgURL = comics[i].imgURL;
    json[comics[i].title].topScore = comics[i].topScore;
  }

  return json;
};

const getComicData = (request, response, params) => {
  if (!params.type) {
    const json = generateError('badRequest', 'Error: Invalid parameter for what type of retrieval.');
    return respondJSON(request, response, 400, json);
  }

  const comicData = {};

  if (params.type === 'front') {
    comicData.data = getFrontPageData();
    return respondJSON(request, response, 200, comicData);
  }
  if (params.type === 'single') {
    if (!params.title) {
      const errorJson = generateError('badRequest', 'Error: Missing title parameter of comic to retrieve.');
      return respondJSON(request, response, 400, errorJson);
    }
    comicData.data = getComic(params.title);
    if (!comicData.title) {
      const errorJson = generateError('notFound', 'Error: Comic not found.');
      return respondJSON(request, response, 404, errorJson);
    }
    return respondJSON(request, response, 200, comicData);
  }
  if (params.type === 'list') {
    comicData.data = getAllComics();
    return respondJSON(request, response, 200, comicData);
  }

  const errorJson = generateError('badRequest', 'Error: Bad request type parameter.');
  return respondJSON(request, response, 400, errorJson);
};

// const addComic = (request, response, comicToAdd) => {

// };

module.exports = {
  getComicData,

};

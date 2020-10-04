/* comics array of comic objects
Structure:
    top Level: "NameOfComic"
        Properties:
        -Title
        -Author
        -Publisher
        -Total Score (not sent through POST when creating new comic, but when adding review it gets
          set)
        -Cover Image URL (optional)
        -Reviews, an object
            Structure:
            Indexed by ID?
                -User (Implement later)
                -Score
                -Written Review: (optional?)
*/

// ALL IMAGES ARE THE PROPERTY OF THE PUBLISHERS AND THE ARTISTS
const comics = {
  'Empty Zone': {
      title: 'Empty Zone',
      author: 'Jason Shawn Alexander',
      publisher: 'Image Comics',
      totalScore: 9.5,
      imgURL: 'https://cdn.imagecomics.com/assets/i/releases/19368/empty-zone-1_faf3cdff1a.jpg',
      lastReviewed: Date.now(),
      reviews: [
        {
          score: 9,
          written: '',
          // user tbi
        },
        {
          score: 10,
          written: 'An amazing blend of interesting worlds, strange and broken characters, and wierd happenings.',
          // user tbi
        },
      ],
    },
  'The Crow':{
        title: 'The Crow',
        author: 'James O\'Barr',
        publisher: 'Caliber Comics',
        totalScore: 10,
        imgURL: 'https://upload.wikimedia.org/wikipedia/en/8/85/The_Crow1_Cover.jpg',
        lastReviewed: Date.now(),
        reviews: [
          {
            score: 10,
            written: '',
          },
        ],
      },
  'Carnage, U.S.A.' : {
        title: 'Carnage, U.S.A.',
        author: 'Zeb Wells',
        publisher: 'Marvel Comics',
        totalScore: 8,
        imgURL: 'https://vignette.wikia.nocookie.net/marveldatabase/images/b/bd/Carnage%2C_U.S.A._Vol_1_1.jpg',
        lastReviewed: Date.now(),
        reviews: [
          {
            score: 8,
            written: '',
          },
        ],
      },
  'All Star Batman & Robin': {
        title: 'All Star Batman & Robin',
        author: 'Frank Miller',
        publisher: 'DC Comics',
        totalScore: 4,
        imgURL: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Allstarbatmanandrobin01.jpg',
        lastReviewed: Date.now(),
        reviews: [
          {
            score: 4,
            written: '',
          },
        ],
      },
  'Red Lanterns Vol. 4: Blood Brothers': {
        title: 'Red Lanterns Vol. 4: Blood Brothers',
        author: 'Charles Soule',
        publisher: 'DC Comics',
        totalScore: 7,
        imgURL: 'https://www.dccomics.com/sites/default/files/styles/covers192x291/public/gn-covers/2018/05/redlanterns_vol4_bloodbros_5b045b12a93552.91300624.jpg',
        lastReviewed: Date.now(),
        reviews: [
          {
            score: 7,
            written: 'If you like the change to Red Lanterns as more characters than rage villains, you will find a lot to like here. Gives a lot of character to the individual Red Lanterns, but some may find that it feels forced at points to give them empathetic backstories.',
          },
        ],
      },
};

const respondJSON = (request, response, status, json) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(json));
  response.end();
};

const respondMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const generateError = (id, message) => {
  const errorJson = {};

  errorJson.message = message;
  errorJson.id = id;

  return errorJson;
};

//Sorts the array of comics from highest score to lowest score.
// ref: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/ 
const descendingTotalScore = (a, b) => {
  if (a.totalScore > b.totalScore) 
    return -1;
  if( a.totalScore < b.totalScore)
    return 1;

  return 0;
};

const descendingReviewDate =(a, b) =>{
  if (a.lastReviewed > b.lastReviewed) 
  return -1;
if( a.lastReviewed < b.lastReviewed)
  return 1;

return 0;
} 

//TO FINISH
const getFrontPageData = () => {

  const list = [];

  for(const comic in comics){
    list.push(comics[comic]);
  }



  const top3 = {};
  if (list.length <= 3) {
    for (let i = 0; i < list.length; i++) {
      // const json = {};
      // json.title = comics[i].title;
      // json.imgURL = comics[i].imgURL;
      // json.totalScore = comics[i].totalScore;
      top3[list[i].title] = list[i];
    }
  } else {
    // Change this to sorting the comics by top score and then getting top 3
    let numAdded = 0;
    list.sort(descendingTotalScore);
    
    for (let i = 0; i < 3; i++) {
        // const json = {};
        // json.title = comics[i].title;
        // json.imgURL = comics[i].imgURL;
        // json.totalScore = comics[i].totalScore;
        top3[list[i].title] = list[i];
        numAdded++;
        
      if(numAdded >= 3)
        break;
    }
  }

  // Get the 3 most recently reviewed.
  const recentReviews = {};
  if (list.length <= 3) {
    for (let i = 0; i < list.length; i++) {
      recentReviews[list[i].title] = list[i];
    }
  } else {
    // Change this to sorting the comics by top score and then getting top 3
    let numAdded = 0;
    list.sort(descendingReviewDate);
    
    for (let i = 0; i < 3; i++) {
        recentReviews[list[i].title] = list[i];
        numAdded++;
        
      if(numAdded >= 3)
        break;
    }
  }

  // const recentReviews = {};
  // to be implemented

  const json = {};
  json.top3 = top3;
  json.recentReviews = recentReviews;

  return json;
};

const getComic = (titleToGet) => {
  // change this to a better search function?

  if(comics[titleToGet]){
    const json = comics[titleToGet];
    return json;
  }

  const json = {};
  return json;
};


const getAllComics = () => {
  const list = {};

  for(const comic in comics){
    const json = {};
    json.title = comics[comic].title;
    json.imgURL = comics[comic].imgURL;
    json.totalScore = comics[comic].totalScore;
    list[json.title] = json;
  }

  return list;
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
    if (!comicData.data.title) {
      const errorJson = generateError('notFound', 'Error: Comic not found.');
      return respondJSON(request, response, 404, errorJson);
    }
    return respondJSON(request, response, 200, comicData.data);
  }
  if (params.type === 'list') {
    comicData.data = getAllComics();
    return respondJSON(request, response, 200, comicData);
  }

  const errorJson = generateError('badRequest', 'Error: Bad request type parameter.');
  return respondJSON(request, response, 400, errorJson);
};

const calculateScore = (titleToUpdate) =>{
  let total = 0;
  let numReviews = comics[titleToUpdate].reviews.length;

  for(let i = 0; i < numReviews; i++){
    total+=comics[titleToUpdate].reviews[i].score;
  }

  comics[titleToUpdate].totalScore = (total/numReviews);

};

const addReview = (request, response, reviewToAdd) =>{
  const responseJSON = {
    message: 'Title and Score are all needed parameters.',
  };

  if(!reviewToAdd.title || !reviewToAdd.score){
    responseJSON.id = 'missingParameters';
    return respondJSON(request, response, 400, responseJSON);
  }

  const review = {
    score: parseInt(reviewToAdd.score),
    written: '',
  };

  if(reviewToAdd.written){
    review.written = reviewToAdd.written;
  }

  comics[reviewToAdd.title].reviews.push(review);
  calculateScore(reviewToAdd.title);

  comics[reviewToAdd.title].lastReviewed = Date.now();

  return respondMeta(request, response, 204);

};


const addComic = (request, response, comicToAdd) => {

  const responseJSON = {
    message: 'Title, Author, Publisher and a URL for the cover are all needed parameters.',
  };

  if(!comicToAdd.title || !comicToAdd.author || !comicToAdd.publisher || !comicToAdd.imgURL){
    responseJSON.id = 'missingParameters';
    return respondJSON(request, response, 400, responseJSON);
  };

  let statusCode = 201;

  if(comics[comicToAdd.title]){
    statusCode = 204;
    comics[comicToAdd.title].author = comicToAdd.author;
    comics[comicToAdd.title].publisher = comicToAdd.publisher;
    comics[comicToAdd.title].imgURL = comicToAdd.imgURL;
  }
  else{
    comics[comicToAdd.title] = {};
    comics[comicToAdd.title].title = comicToAdd.title;
    comics[comicToAdd.title].author = comicToAdd.author;
    comics[comicToAdd.title].publisher = comicToAdd.publisher;
    comics[comicToAdd.title].totalScore = 0;
    comics[comicToAdd.title].lastReviewed = Date.now();
    comics[comicToAdd.title].imgURL = comicToAdd.imgURL;
    comics[comicToAdd.title].reviews = [];
  }

  // if(statusCode === 201){
  //   responseJSON.message = 'Successfully Created New Comic Entry.';
  //   return respondJSON(request, response, statusCode, responseJSON);
  // }

  return respondMeta(request, response, statusCode);
};

module.exports = {
  getComicData,
  addComic,
  addReview,
};

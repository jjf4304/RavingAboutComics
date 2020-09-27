/* comics array of comic objects
Structure:
    top Level: "NameOfComic"
        Properties:
        -Title
        -Author
        -Publisher
        -Total Score (not sent through POST when creating new comic)
        -Volume/Issue (optional)
        -Cover Image URL (optional)
        -Reviews, an object
            Structure:
            Indexed by ID?
                -USer (Implement later)
                -Score
                -Written Review: (optional?)
                -Review Time
*/
const comics = [];


const respondJSON = (request, response, status, json) => {
    const headers = {
        'Content-Type' : 'application/json',
    };

    response.writeHead(status, headers);
    response.write(JSON.stringify(json));
    response.end();
};

const respondMeta = (request, response, status) =>{
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.end();
};

const generateError = (id, message) =>{
    const errorJson = {};

    errorJson.message = message;
    errorJson.id = id;

    return errorJson;

};

const getFrontPageData = () =>{

    const top3 = {};
    if(comics.length <= 3){
        for(i = 0; i < comics.length; i++){
            const json = {};
            json.title = comics[i].title;
            json.imgURL = comics[i].imgURL;
            json.topScore = comics[i].topScore;
            top3[json.title] = json;
        }
    }
    else{
        i = 0;
        numAdded = 0;
        while(i < comics.length){
            if(comics[i].totalScore >= 4.5){
                const json = {};
                json.title = comics[i].title;
                json.imgURL = comics[i].imgURL;
                json.topScore = comics[i].topScore;
                top3[json.title] = json;
                numAdded++;
            }
            i++;
        }
    }

    const recentReviews = {};
    //tbi

    const json = {};
    json.top3 = top3;
    //json.recentReviews = recentReviews;

    return json;
};

const getComicData = (request, response, params) =>{
    if(!params.getType){
        const json = generateError("badRequest", "Error: Invalid parameter for what type of retrieval.");
        return respondJSON(request, response, '400', json );
    }

    const comicData = {};

    switch(params.type){

    }

};
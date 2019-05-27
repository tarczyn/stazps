let formattedData = {};

//zad 1
// let init = function() {
fetch('https://www.reddit.com/r/funny.json')
    .then(response => response.json())
    .then(data => {
        let content = data.data.children;
        let posts = content.map(obj => {
            return createPostInNewFormat(obj.data);
        })
        formattedData.posts = posts;
        formattedData.count = posts.length;
        return formattedData;
    });
// }

let createPostInNewFormat = function(data) {
    let postNewFormat = {};
    postNewFormat.title = data.title;
    postNewFormat.upvotes = data.ups;
    postNewFormat.score = data.score;
    postNewFormat.num_comments = data.num_comments;
    postNewFormat.created = new Date((data.created*1000)).toLocaleString();
    return postNewFormat;
}

//zad 2 - sortowanie od najmniejszego
let sort = function(field) {
    let availableFields = ["upvotes", "num_comments", "score", "created"];
    if (availableFields.includes(field)) {
        let sortedPosts = formattedData.posts.sort((postA, postB) => (postA[field] > postB[field]) ? 1 : ((postB[field] > postA[field]) ? -1 : 0));
        return sortedPosts;
    } else {
        console.log("Unsupported sort mode");
    }
}

//zad 3
let findTitleWithHighestCoefficient = function() {
    let coefficientList = formattedData.posts.map(post => {
        let coefficient = post.upvotes / post.num_comments;
        return {
            coefficient: coefficient,
            post: post
        }
    });
    coefficientList.sort((a, b) => (a.coefficient > b.coefficient) ? -1 : ((b.coefficient > a.coefficient) ? 1 : 0));
    let filteredList = coefficientList.filter(obj => obj === coefficientList[0]);
    filteredList.sort((a,b) => (a.post.created > b.post.created) ? -1 : ((b.post.created > a.post.created) ? 1 : 0));
    return filteredList[0].post.title;
}

//zad 4
let findPostsFromLastDay = function() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    console.log(yesterday);
    console.log(yesterday.toLocaleString());
    return formattedData.posts.filter(post => {
        return post.created > yesterday.toLocaleString();
    });
}

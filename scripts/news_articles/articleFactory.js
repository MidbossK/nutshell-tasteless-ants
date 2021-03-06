// author: Jesse Page
// this will create a new object with title, synopsis, url parameters and give it a list of properties
console.log("articleFactory")
const submitArticle = require("./articleController")
const NutshellDatabase = require("../register_login/NutshellDatabase")


// id generator
const articleId = function* (from) {
    let id = 1
    while (true) {
        yield from + id
        id ++
    }
}
// dat instance tho
const lastNewsId = NutshellDatabase.news[NutshellDatabase.news.length - 1] || {id: 0}
const articleIdGenerator = articleId(lastNewsId.id)

// object factory
const articleFactory = function(title, synopsis, url) {
    let timestamp = Date.now();
    return Object.create(null, {
        "id": {
            value: articleIdGenerator.next().value,
            enumerable: true
        },
        "userId": { //i don't know how this will turn out?
            value: JSON.parse(sessionStorage.getItem("activeUser")).id,
            enumerable: true
        },
        "title": {
            value: title,
            enumerable: true
        },
        "synopsis": {
            value: synopsis,
            enumerable: true
        },
        "url": {
            value: url,
            enumerable: true
        },
        "timestamp": {
            value: timestamp,
            enumerable: true
        },
        // // example from Steve's pagination
        // "sort": {
        //     value: (news) => articles = arr.sort((p, n) => n.timestamp - p.timestamp)
        // }
    })
}

module.exports = articleFactory
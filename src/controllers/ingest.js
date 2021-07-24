const models = require("../models");
const Youtube = require("../services/youtube");

const search = async (creds, query, publishedAfter = new Date()) => {
    let response = await Youtube.search(creds.key, query, publishedAfter)
    return { status: response.status, data: response.data };
}

const ingest = async (query, publishedAfter) => {
    let creds = await models.Creds.findOne({ "where": { "active": true } })
    creds = creds.dataValues;
    const { status, data } = await search(creds, query, publishedAfter)
    if (status === 200) {
        let videos = data.items.map(transformItem)
        let insert = await models.Video.bulkCreate(videos)
        return insert;
    }
    else {
        return null;
    }
}


const transformItem = (item) => {
    let data = {};
    data.id = item.id.videoId;
    data.title = item.snippet.title;
    data.title = item.snippet.description;
    data.metaData = item
    return data;
}

// module.exports.search = search;
module.exports.ingest = ingest;
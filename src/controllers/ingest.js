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
    console.log(data);
    if (status === 200) {
        let videos = data.items.map(transformItem)
        console.log(videos);
        let insert = await models.Video.bulkCreate(videos, { ignoreDuplicates: true })
        return insert;
    }
    else if (status === 403) {
        // TODO: disable the API key and use other api key
        return null;
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

module.exports.ingest = ingest;
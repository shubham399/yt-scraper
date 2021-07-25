const models = require("../models");
const Youtube = require("../services/youtube");

const search = async (creds, query, publishedAfter = new Date()) => {
    let response = await Youtube.search(creds.key, query, publishedAfter)
    return { status: response.status, data: response.data };
}

const ingest = async (query, publishedAfter) => {
    let creds = await models.Creds.findOne({ "where": { "active": true } })
    if (creds) {
        creds = creds.dataValues;
        const { status, data } = await search(creds, query, publishedAfter)
        if (status === 200) {
            let videos = data.items.map(transformItem)
            let insert = await models.Video.bulkCreate(videos, { ignoreDuplicates: true })
            return insert;
        }
        else if (status === 403 || status === 401) {
            await models.Creds.update({ "active": false }, { where: { "id": creds.id } })
           
        }
        else {
            return null;
        }
    }
    else {
        throw new Error("No API Key")
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
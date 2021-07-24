const models = require("../models");
const Youtube = require("../services/youtube");

const search = async (query, publishedAfter = new Date()) => {
    let creds = await models.Creds.findOne({ "where": { "active": true } })
    let response = await Youtube.search(creds.dataValues.key, query, publishedAfter)
    return {status:response.status,data:response.data};
}

module.exports.search = search;
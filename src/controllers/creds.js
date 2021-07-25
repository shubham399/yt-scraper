const models = require("../models");

const getCreds = async (limit = 10, offset = 0) => {
    limit = parseInt(limit);
    offset = parseInt(offset);
    let creds = await models.Creds.findAndCountAll({ offset, limit });
    creds["total"] = creds["count"]
    creds["creds"] = creds["rows"]
    creds["rows"] = undefined;
    creds["count"] = undefined;
    creds["limit"] = limit;
    creds["offset"] = offset;
    return creds;
}
const createCred = async (key) => {
    let creds = await models.Creds.create({ key });
    return creds;
}
const getCredById = async (id) => {
    id = parseInt(id);
    let creds = await models.Creds.findOne({ where: { id } });
    return creds;
}
const deleteCred = async (id) => {
    let creds = await models.Creds.destory({ where: { id } });
    return creds;
}


module.exports.createCred = createCred;
module.exports.getCreds = getCreds;
module.exports.getCredById = getCredById;
module.exports.deleteCred = deleteCred;
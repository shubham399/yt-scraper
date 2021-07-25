const models = require("../models");
const { Op } = require("sequelize");

const getCreds = async (limit = 10, offset = 0) => {
    limit = parseInt(limit);
    offset = parseInt(offset);
    let creds = await models.Creds.findAndCountAll({ offset, limit });
    creds["total"] = creds["count"]
    creds["creds"] = creds["rows"]
    creds["creds"] = creds["creds"].map(cred => {
        cred["key"] = maskCred(cred["key"]);
        return cred;
    })
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
    let cred = await models.Creds.findOne({ where: { id } });
    console.log(cred);
    cred["key"] = maskCred(cred["key"]);
    return cred
}
const deleteCred = async (id) => {
    let creds = await models.Creds.destroy({ where: { id } });
    return creds;
}
const releaseCred = async () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let creds = await models.Creds.update({ active: true }, {
        where: {
            [Op.and]: {
                updatedAt: {
                    [Op.lte]: date
                },
                "active": false
            }
        }
    });
    return creds;
}


const maskCred = (creds) => {
    let len = creds.length;
    let potion = len / 3 <= 4 ? len / 3 : 4;
    let middle = len - (2 * potion)
    let middlePart = "X".repeat(middle)
    let start = creds.substring(0, potion);
    let end = creds.substring(len - potion, len);
    return start + middlePart + end;
}

module.exports.createCred = createCred;
module.exports.getCreds = getCreds;
module.exports.releaseCred = releaseCred;
module.exports.getCredById = getCredById;
module.exports.deleteCred = deleteCred;
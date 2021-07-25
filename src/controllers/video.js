const { Op } = require("sequelize");
const models = require("../models");

const getVideos = async (search, limit = 10, offset = 0) => {
    let where = search ?
        process.env.NODE_ENV === 'test' ?
            {
                [Op.or]: [
                    {
                        "title": { [Op.like]: "%" + search + "%" }
                    },
                    {
                        "description": { [Op.like]: "%" + search + "%" }
                    }
                ]
            }
            : {
                [Op.or]: [
                    {
                        "title": { [Op.iLike]: "%" + search + "%" }
                    },
                    {
                        "description": { [Op.iLike]: "%" + search + "%" }
                    }
                ]
            }
        : {};
    let videos = await models.Video.findAndCountAll({ where, offset, limit });
    return videos;
}



module.exports.getVideos = getVideos;
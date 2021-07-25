const { Op } = require("sequelize");
const models = require("../models");

const getVideos = async (search, limit = 10, offset = 0) => {
    limit = parseInt(limit);
    offset = parseInt(offset);
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
    videos["total"] = videos["count"]
    videos["videos"] = videos["rows"]
    videos["videos"] = videos["videos"].map(cleanVideo)
    videos["rows"] = undefined;
    videos["count"] = undefined;
    videos["limit"] = limit;
    videos["offset"] = offset;
    return videos;
}



const cleanVideo = (video) => {
    return { id: video.id, "title": video.title, "description": video.description, "metaData": video.metaData }
}


module.exports.getVideos = getVideos;
const { log } = require('debug');
var express = require('express');
const { Op } = require("sequelize");
const models = require("../models");
var router = express.Router();


/* Search  API */
/* TODO: Complete This Function */
router.get('/', async function (req, res, next) {
  try {
    let where = req.query.search ?
      process.env.NODE_ENV === 'test' ?
        {
          [Op.or]: [
            {
              "title": { [Op.like]: "%" + req.query.search + "%" }
            },
            {
              "description": { [Op.like]: "%" + req.query.search + "%" }
            }
          ]
        }
        : {
          [Op.or]: [
            {
              "title": { [Op.iLike]: "%" + req.query.search + "%" }
            },
            {
              "description": { [Op.iLike]: "%" + req.query.search + "%" }
            }
          ]
        }
      : {};
    let videos = await models.Video.findAndCountAll({ where, offset: 0, limit: 10 });
    return res.json(videos);
  }
  catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }

});


module.exports = router;

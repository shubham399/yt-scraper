var express = require('express');
var router = express.Router();
const { getVideos } = require('../controllers/video');

/* Search  API */
/* TODO: Complete This Function */
router.get('/', async function (req, res, next) {
  try {
    let videos = await getVideos(req.query.search, req.query.limit, req.query.offset);
    return res.json(videos);
  }
  catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }

});


module.exports = router;

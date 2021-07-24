var express = require('express');
var router = express.Router();
var { search } = require("../controllers/ingest");


/* Search  API */
/* TODO: Complete This Function */
router.post('/', async function (req, res, next) {
  try {
    let query = req.body.query;
    let apiRes = await search(query)
    res.send(apiRes)
  } catch (e) {
    res.status(500).send(e.message)
  }
});


module.exports = router;

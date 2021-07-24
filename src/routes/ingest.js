var express = require('express');
var router = express.Router();
var { ingest } = require("../controllers/ingest");


/* Search  API */
/* TODO: Complete This Function */
router.post('/', async function (req, res, next) {
  try {
    let query = req.body.query;
    if (query === undefined) {
      return res.status(400).send({ "error": true, "message": "query is mandatory" })
    }
    let publishedAfter = req.body.publishedAfter || null;
    ingest(query, publishedAfter)
    return res.status(202).send({ "message": "Request Accepted." })
  } catch (e) {
    return res.status(500).send(e.message)
  }
});


module.exports = router;

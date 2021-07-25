var express = require('express');
var router = express.Router();
const { createCred, getCreds, getCredById, deleteCred } = require('../controllers/creds');

/* Create */
router.post('/', async function (req, res, next) {
    try {
        let creds = await createCred(req.body.key);
        return res.json(creds);
    }
    catch (err) {
        return res.status(500).json({ error: true, message: err.message });
    }
});
/* List */
router.get('/', async function (req, res, next) {
    try {
        let creds = await getCreds(req.query.limit, req.query.offset);
        return res.json(creds);
    }
    catch (err) {
        return res.status(500).json({ error: true, message: err.message });
    }
});
/* Get One By Id */
router.get('/:id', async function (req, res, next) {
    try {
        let creds = await getCredById(req.params.id);
        return res.json(creds);
    }
    catch (err) {
        return res.status(500).json({ error: true, message: err.message });
    }
});
/* Delete one Cred */
router.delete('/:id', async function (req, res, next) {
    try {
        let creds = await deleteCred(req.params.id);
        return res.json(creds);
    }
    catch (err) {
        return res.status(500).json({ error: true, message: err.message });
    }
});


module.exports = router;

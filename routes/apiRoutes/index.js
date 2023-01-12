//The index.js file will act as a central hub to pull all routes together

const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'))

module.exports = router;
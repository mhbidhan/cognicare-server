const express = require('express');
const { okayaCheckin } = require('../../controllers/okaya/okaya.controller');

const okayaRouter = express.Router();

okayaRouter.post('/webhook', okayaCheckin);

module.exports = okayaRouter;

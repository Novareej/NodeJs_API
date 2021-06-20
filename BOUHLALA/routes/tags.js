var express = require('express');
var router = express.Router();
const tagsRepo = require('../repositories/tags');


router.get('/', async function(req, res, next) {
  res.send(await  tagsRepo.getAllTag())
});


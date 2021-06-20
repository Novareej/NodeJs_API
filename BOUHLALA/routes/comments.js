var express = require('express');
var router = express.Router();
const commentsRepo = require('../repositories/comments');


router.get('/', async function(req, res, next) {
  res.send(await  commentsRepo.getAllComment())
});

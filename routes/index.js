var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});
router.get('/addAd', function(req, res, next) {
  res.render('addAd', { title: '添加广告' });
});
router.get('/addCategory', function(req, res, next) {
  res.render('addCategory', { title: '添加分类' });
});
router.get('/addType', function(req, res, next) {
  res.render('addType', { title: '添加类型' });
});
module.exports = router;

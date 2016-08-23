var express = require('express');
var router = express.Router();
var fun = require('../model/mysqlBaseFun');
var moment = require("moment");
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: '首页'
	});
});
router.get('/addAd', function(req, res, next) {
	res.render('addAd', {
		title: '添加广告'
	});
});
router.get('/addCategory', function(req, res, next) {
	res.render('addCategory', {
		title: '添加分类'
	});
});
router.get('/allCategory', function(req, res, next) {
	fun.query("select * from  category", function(rows) {
		for (var i = 0; i < rows.length; i++) {
			rows[i]['time'] = moment(rows[i]['time']).format('YYYY-MM-DD HH:mm:ss');
		}
		res.render('allCategory', {
			title: '所有分类',
			categoryList: rows
		});
	})

});
router.get('/addType', function(req, res, next) {
	res.render('addType', {
		title: '添加类型'
	});
});
router.post('/api/addType', function(req, res, next) {
	var name = req.body.name;
	var html=req.body.html;
	var js=req.body.js;
	fun.query("select * from  type where name=('" + name + "')", function(rows) {
		if (rows.length > 0) {
			res.send("2");
		} else {
			var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
			fun.query("insert into type(name,time,html,js) values ('" + name + "','" + curTime + "','"+html+"','"+js+"')", function(rows1) {
				res.send(rows1);
			});
		}
	})
});




router.post('/api/addCategory', function(req, res, next) {
	var name = req.body.name;
	fun.query("select * from  category where name=('" + name + "')", function(rows) {
		if (rows.length > 0) {
			res.send("2");
		} else {
			var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
			fun.query("insert into category(name,time) values ('" + name + "','" + curTime + "')", function(rows1) {
				res.send(rows1);
			});
		}
	})
});
router.post('/api/updateCategory', function(req, res, next) {
	var id = req.body.id;
	var name = req.body.name;
	var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
	fun.query("update category set name='" + name + "',time='" + curTime + "' where id='" + id + "'", function(rows) {
		rows.time = curTime;
		res.send(rows);
	})
});
router.post('/api/deleteCategory', function(req, res, next) {
	var idList = req.body['idList[]'];
	console.log(typeof(idList));
	if (typeof(idList)=="string")
		idList = idList[0];
	else
		idList = idList.join(',');
	fun.query("delete from category  where id in (" + idList + ") ", function(rows) {
		res.send(rows);
	})
});
module.exports = router;
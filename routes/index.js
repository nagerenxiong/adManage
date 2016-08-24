var express = require('express');
var router = express.Router();
var fun = require('../model/mysqlBaseFun');
var moment = require("moment");
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: '首页'
	});
});

router.get('/upload', function(req, res, next) {
	res.render('upload',{files:false});
});
router.post('/upload', function(req, res, next) {
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({
		uploadDir: './public/images/upload/'
	});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);

		if (err) {
			console.log('parse error: ' + err);
		} else {
			// console.log('parse files: ' + filesTmp);
			// console.log(111111111111111111111111111)
			// console.log(files.inputFile)
			// var inputFile = files.inputFile[0];
			// var uploadedPath = inputFile.path;
			// var dstPath = './file' + inputFile.originalFilename;
			// //重命名为真实文件名
			// fs.rename(uploadedPath, dstPath, function(err) {
			// 	if (err) {
			// 		console.log('rename error: ' + err);
			// 	} else {
			// 		console.log('rename ok');
			// 	}
			// });
		}
		// res.writeHead(200, {
		// 	'content-type': 'text/plain;charset=utf-8'
		// });
		// res.write('received upload:\n\n');
		// res.end(util.inspect({
		// 	fields: fields,
		// 	files: filesTmp
		// }));
		console.log(fields);
		console.log(files);
		res.render('upload',{files:files.userfile[0]["path"]});
	});
});
router.get('/addAd', function(req, res, next) {
	fun.query("select * from  category", function(rows) {
		fun.query("SELECT boxId FROM  adv  ORDER BY id DESC LIMIT 1 ", function(rows1) {
			console.log(rows1)
			var boxId = 1;
			if (rows1.length != 0)
				boxId = rows1[0].boxId * 1 + 1
			res.render('addAd', {
				title: '添加广告',
				categoryList: rows,
				boxId: boxId
			});
		})
	})
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
router.post('/api/addAd', function(req, res, next) {
	var name = req.body.name;
	var html = req.body.html;
	var js = req.body.js;
	var css = req.body.css;
	var boxId = req.body.boxId;
	var catId = req.body.catId;
	console.log(req.body)
	fun.query("select * from  adv where name=('" + name + "')", function(rows) {
		if (rows.length > 0) {
			res.send("2");
		} else {
			var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
			fun.query("insert into adv(name,time,html,js,css,boxId,catId) values ('" + name + "','" + curTime + "','" + html + "','" + js + "','" + css + "','" + boxId + "','" + catId + "')", function(rows1) {
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
	if (typeof(idList) == "string")
		idList = idList[0];
	else
		idList = idList.join(',');
	fun.query("delete from category  where id in (" + idList + ") ", function(rows) {
		res.send(rows);
	})
});
module.exports = router;
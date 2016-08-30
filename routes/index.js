var express = require('express');
var router = express.Router();
var fun = require('../model/mysqlBaseFun');
var moment = require("moment");
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var path = require('path');

/* GET home page. */
router.get('/', checkLogin);
router.get('/', function(req, res, next) {
	res.render('index', {
		title: '首页'
	});
});
router.get('/index/:page', function(req, res, next) {
	var page = (req.params['page'] - 1) * 10;
	sql = 'SELECT t1.*, t2.name catName FROM adv t1 INNER JOIN category t2 ON t1.catId = t2.id order by time desc limit ' + page + ',10';
	sql1 = 'SELECT COUNT(*) AS pages  FROM adv';
	fun.query(sql, function(rows) {
		fun.query(sql1, function(rows1) {
			for (var i = 0; i < rows.length; i++) {
				rows[i]['time'] = moment(rows[i]['time']).format('YYYY-MM-DD HH:mm:ss');
			}
			var pages = 0;
			console.log(rows1[0].pages);
			if (rows1[0].pages % 10 == 0) {
				pages = rows1[0].pages / 10;
			} else {
				pages = parseInt(rows1[0].pages / 10) + 1;
			}
			res.json({
				list: rows,
				pages: pages
			});
		})
	});
});



router.get('/addAdBox', function(req, res, next) {
	fun.query("select * from  category where type=2", function(rows) {
		fun.query("SELECT t1.*, t2.name catName FROM adv t1 INNER JOIN category t2 ON t1.catId = t2.id", function(rows1) {
			fun.query("select * from  category where type=1", function(rows2) {
				for (var i = 0; i < rows1.length; i++) {
					rows1[i]['time'] = moment(rows1[i]['time']).format('YYYY-MM-DD HH:mm:ss');
				}
				res.render('addAdBox', {
					title: '添加广告位',
					categoryList: rows,
					advList: rows1,
					categoryList1: rows2
				});
			})
		})
	})
});
router.get('/allAdBox', function(req, res, next) {
		res.render('allAdBox', {
			title: '所有广告'
		});
});

router.get('/allAdBox/page/:page', function(req, res, next) {
	var page = (req.params['page'] - 1) * 10;
	sql = 'SELECT t1.*, t2.name catName FROM adBox t1 INNER JOIN category t2 ON t1.catId = t2.id order by time desc limit ' + page + ',10';
	sql1 = 'SELECT COUNT(*) AS pages  FROM adBox';
	fun.query(sql, function(rows) {
		fun.query(sql1, function(rows1) {
			for (var i = 0; i < rows.length; i++) {
				rows[i]['time'] = moment(rows[i]['time']).format('YYYY-MM-DD HH:mm:ss');
			}
			var pages = 0;
			console.log(rows1[0].pages);
			if (rows1[0].pages % 10 == 0) {
				pages = rows1[0].pages / 10;
			} else {
				pages = parseInt(rows1[0].pages / 10) + 1;
			}
			res.json({
				list: rows,
				pages: pages
			});
		})
	});
});



router.get('/editAdBox/:id', function(req, res, next) {
	var id = req.params['id'];
	fun.query("select * from  adbox where id=" + id, function(rows3) {
		var advIdList = rows3[0]["advIdList"];
		fun.query("SELECT t1.*, t2.name catName FROM adv t1 INNER JOIN category t2 ON t1.catId = t2.id where t1.id in (" + advIdList + ")", function(rows5) {
			fun.query("select * from  category where type=2", function(rows) {
				fun.query("SELECT t1.*, t2.name catName FROM adv t1 INNER JOIN category t2 ON t1.catId = t2.id", function(rows1) {
					fun.query("select * from  category where type=1", function(rows2) {
						for (var i = 0; i < rows1.length; i++) {
							rows1[i]['time'] = moment(rows1[i]['time']).format('YYYY-MM-DD HH:mm:ss');
						}
						for (var i = 0; i < rows5.length; i++) {
							rows5[i]['time'] = moment(rows5[i]['time']).format('YYYY-MM-DD HH:mm:ss');
						}
						res.render('addAdBox', {
							title: '修改广告位',
							categoryList: rows,
							advList: rows1,
							categoryList1: rows2,
							adbox: rows3,
							curAdvList: rows5,
							id: id
						});
					})
				})
			})
		})
	})
});

router.get('/upload', function(req, res, next) {
	res.render('upload', {
		files: false
	});
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
		res.render('upload', {
			files: files.userfile[0]["path"]
		});
	});
});
router.get('/addAd', function(req, res, next) {
	fun.query("select * from  category where type=1", function(rows) {
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


function User(user){
    this.name = user.name;
    this.pwd = user.pwd;
};

//几个路由共用，所以为静态方法
User.prototype.get = function (username, callback) {
    var sql = 'SELECT * FROM user WHERE name="'+username+'"';
    fun.query(sql,  function(rows) {
        var row = rows ? rows[0] : [];
        callback(row);
    });
};


router.get('/login', checkNotLogin);
router.get('/login', function(req, res) {
	res.render('login', {
		title: '登录'
	});
});

router.post('/login', checkNotLogin);
router.post('/login', function(req, res) {
	// var md5 = crypto.createHash('md5');
	// var	password = md5.update(req.body.password).digest('base64');
	var pwd = req.body.pwd;
	var name=req.body.name;
	var newUser = new User({
		name: name,
		pwd: pwd
	});
	console.log(1111111);
	newUser.get(name, function(user) {
		console.log(pwd)
	console.log(name)
		if (!user) {
			return res.redirect('/login');
		}
		if (user.pwd != pwd) {
			return res.redirect('/login');
		}
		req.session.user = user;
		res.redirect('/');
	});
});

router.get('/logout', checkLogin);
    router.get('/logout', function(req, res){
        req.session.user = null;
        res.redirect('/login');
	});

function checkLogin(req, res, next) {
	console.log(11111111)
	if (!req.session.user) {
		return res.redirect('/login');
	}
	next();
}

function checkNotLogin(req, res, next) {
	if (req.session.user) {
		console.log(req.session.user+"ggggggg")
		return res.redirect('/');
	}
	console.log(22222222)
	next();
}









router.post('/api/updateAd', function(req, res, next) {
	var html = req.body.html;
	var js = req.body.js;
	var css = req.body.css;
	var catId = req.body.catId;
	var name = req.body.name;
	var id = req.body.id;
	var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
	fun.query("update adv set name='" + name + "',html='" + html + "',css='" + css + "',js='" + js + "',time='" + curTime + "',catId='" + catId + "' where id=" + id, function(rows) {
		res.send(rows);
	})

})


router.get('/editAd/:id', function(req, res, next) {
	var id = req.params['id'];
	fun.query("select * from  category where type=1", function(rows) {
		fun.query("SELECT * from  adv where id=" + id, function(rows1) {
			res.render('addAd', {
				title: '添加广告',
				categoryList: rows,
				adv: rows1,
				id: id
			});
		})
	})
});


router.get('/addCategory', function(req, res, next) {
	res.render('addCategory', {
		title: '添加分类'
	});
});
router.get('/allCategory/:type', function(req, res, next) {
	var type = req.params['type'];
	fun.query("select * from  category where type=" + type, function(rows) {
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
router.post('/makeJs', function(req, res, next) {
	console.log(11111);
	var html = req.body.html;
	var catId = req.body.catId;
	var name = req.body.name;
	var advIdList = req.body["advIdList[]"];
	console.log(advIdList);
	fun.query("SELECT adId FROM  adBox  ORDER BY id DESC LIMIT 1 ", function(rows1) {
		var adId = 1;
		if (rows1.length != 0)
			adId = rows1[0].adId * 1 + 1;
		var pathCur = path.resolve(__dirname, '../public/javascripts/');
		fs.appendFile(pathCur + '/ads/ad' + adId + '.js', html, function(err) {
			if (err) throw err;
		});
		var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
		fun.query("insert into adBox(name,time,adId,catId,advIdList) values ('" + name + "','" + curTime + "','" + adId + "','" + catId + "','" + advIdList + "')", function(rows) {
			res.send(rows);
		})
	})
})
router.post('/updateJs', function(req, res, next) {
	var html = req.body.html;
	var catId = req.body.catId;
	var name = req.body.name;
	var advIdList = req.body["advIdList[]"];
	var id = req.body.id;
	var adId = req.body.adId;
	var pathCur = path.resolve(__dirname, '../public/javascripts/');
	fs.writeFile(pathCur + '/ads/ad' + adId + '.js', html, function(err) {
		if (err) throw err;
	});
	var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
	fun.query("update adBox set name='" + name + "',advIdList='" + advIdList + "',time='" + curTime + "',catId='" + catId + "' where id=" + id, function(rows) {
		res.send(rows);
	})

})


router.post('/api/addCategory', function(req, res, next) {
	var name = req.body.name;
	var type = req.body.type;
	fun.query("select * from  category where name=('" + name + "')", function(rows) {
		if (rows.length > 0) {
			res.send("2");
		} else {
			var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
			fun.query("insert into category(name,time,type) values ('" + name + "','" + curTime + "','" + type + "')", function(rows1) {
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

router.post('/api/deleteAdv', function(req, res, next) {
	var idList = req.body['idList[]'];
	console.log(typeof(idList));
	if (typeof(idList) == "string")
		idList = idList[0];
	else
		idList = idList.join(',');
	fun.query("delete from adv  where id in (" + idList + ") ", function(rows) {
		res.send(rows);
	})
});


module.exports = router;
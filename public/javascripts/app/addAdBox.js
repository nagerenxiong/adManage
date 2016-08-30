$(document).on('click', '.ui-menu-item', function() {
	var catId = $.trim($("#ggwBox").val());
	$("#listgg tr:gt(0)").hide();
	if (catId == "all") {
		$("#listgg tr:gt(0)").show();
		return;
	}
	$("#listgg tr:gt(0)").each(function(index, el) {
		debugger;
		var dataCatId = $.trim($(el).attr('data-catid'));
		if (dataCatId == catId)
			$(el).show();
	});
})
$(document).on('click', '.selectgg', function() {
	var html = $(this).parent().parent().clone(true);
	var id = html.attr('data-id');
	var fag = false;
	$("#xzgg tbody tr").each(function(index, el) {
		var ggg = $(el).attr('data-id');
		if ($(el).attr('data-id') == id)
			fag = true;
	})
	if (fag) {
		layer.tips('已经存在', this, {
			tips: [1, 'red'],
			time: 3000
		});
		return;
	}
	html.find('.selectgg').removeClass('selectgg ui-state-hover ui-state-focus').addClass('delselectgg').children().children().text('移除');
	$("#xzgg tbody").append(html);
})
$(document).on('click', '.delselectgg', function() {
	$(this).parent().parent().remove();
})
$("#submitg").click(function() {
	var htmlStr = "jQuery(document).ready(function($) {";
	var jsStr = '$("body").append(\'<script type=\"text/javascript\">';
	var cssStr = '$("head").append("<style type=\'text/css\'>';
	var name = $.trim($("#ggwTitle").val());
	var tipHtml = false;
	var advIdList = [];
	if (name == "") {
		layer.tips('请输入广告位名', "#ggwTitle", {
			tips: [1, 'red'],
			time: 3000
		});
		return;
	}
	$("#xzgg tbody  tr:gt(0)").each(function(index, el) {
		var boxId = $.trim($(el).children('td').eq(4).children().attr('title'));
		var html = $.trim($(el).children('td').eq(2).children('.html').text());
		var js = $.trim($(el).children('td').eq(2).children('.js').html());
		var css = $.trim($(el).children('td').eq(2).children('.css').html());
		tipHtml = true;
		htmlStr = htmlStr + '$("#' + boxId + '").html(\'' + html + '\');';
		jsStr += js;
		cssStr += css;
		advIdList.push($.trim($(el).attr('data-id')));
	})
	cssStr += '</style>");';
	jsStr += '</script>\');';
	htmlStr = htmlStr + jsStr + cssStr;
	htmlStr += '})';
	htmlStr = htmlStr.replace(/\n/g, '').replace(/\r/g, '');
	if (!tipHtml) {
		layer.tips('请选择广告', "#xzgg", {
			tips: [1, 'red'],
			time: 3000
		});
		return;
	}
	$.ajax({
			url: "/makeJs",
			type: 'post',
			data: {
				html: htmlStr,
				name: name,
				catId: $("#ggwLei").val(),
				advIdList: advIdList
			},
		})
		.done(function(result) {
			if (result.affectedRows == 1) {
				layer.confirm('广告js已经生成，是否继续添加广告位！', {
					btn: ['确定', '后退'], //按钮
					title: false,
					closeBtn: 0
				}, function() {
					window.location.reload();
				}, function() {
					window.history.go(-1);
				});
			}
		})
		.fail(function() {
			console.log("error");
		})

})
$("#updateg").click(function() {
	var htmlStr = "jQuery(document).ready(function($) {";
	var jsStr = '$("body").append(\'<script type=\"text/javascript\">';
	var cssStr = '$("head").append("<style type=\'text/css\'>';
	var name = $.trim($("#ggwTitle").val());
	var tipHtml = false;
	var advIdList = [];
	var id=$("#id").val();
	var adId=$("#adId").val();
	if (name == "") {
		layer.tips('请输入广告位名', "#ggwTitle", {
			tips: [1, 'red'],
			time: 3000
		});
		return;
	}
	$("#xzgg tbody  tr:gt(0)").each(function(index, el) {
		var boxId = $.trim($(el).children('td').eq(4).children().attr('title'));
		var html = $.trim($(el).children('td').eq(2).children('.html').text());
		var js = $.trim($(el).children('td').eq(2).children('.js').html());
		var css = $.trim($(el).children('td').eq(2).children('.css').html());
		tipHtml = true;
		htmlStr = htmlStr + '$("#' + boxId + '").html(\'' + html + '\');';
		jsStr += js;
		cssStr += css;
		advIdList.push($.trim($(el).attr('data-id')));
	})
	cssStr += '</style>");';
	jsStr += '</script>\');';
	htmlStr = htmlStr + jsStr + cssStr;
	htmlStr += '})';
	htmlStr = htmlStr.replace(/\n/g, '').replace(/\r/g, '');
	if (!tipHtml) {
		layer.tips('请选择广告', "#xzgg", {
			tips: [1, 'red'],
			time: 3000
		});
		return;
	}
	$.ajax({
			url: "/updateJs",
			type: 'post',
			data: {
				html: htmlStr,
				name: name,
				id:id,
				adId:adId,
				catId: $("#ggwLei").val(),
				advIdList: advIdList
			},
		})
		.done(function(result) {
			if (result.affectedRows == 1) {
				layer.confirm('修改成功，是否添加广告位！', {
					btn: ['确定', '后退'], //按钮
					title: false,
					closeBtn: 0
				}, function() {
					window.location.reload();
				}, function() {
					window.history.go(-1);
				});
			}
		})
		.fail(function() {
			console.log("error");
		})
})
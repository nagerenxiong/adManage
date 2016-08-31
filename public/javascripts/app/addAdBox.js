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
	html.find('.selectgg').removeClass('selectgg ui-state-hover ui-state-focus').addClass('delselectgg').children().children().text('移除');
	$("#xzgg tbody tr:gt(0)").remove();
	$("#xzgg tbody").append(html);
})
$(document).on('click', '.delselectgg', function() {
	$(this).parent().parent().remove();
})
$("#submitg").click(function() {
	var htmlStr = "document.write('<div>";
	var name = $.trim($("#ggwTitle").val());
	if (name == "") {
		layer.tips('请输入广告位名', "#ggwTitle", {
			tips: [1, 'red'],
			time: 3000
		});
		return;
	}
	var advId=$("#xzgg tr").eq(1).attr('data-id');
	var html = $.trim($("#xzgg tr").eq(1).children('td').eq(2).children('.html').text());
	htmlStr+=html;
	htmlStr +="</div>');";
	htmlStr = htmlStr.replace(/\n/g, '').replace(/\r/g, '');
	if ($("#xzgg tr:gt(0)").length==0) {
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
				advId:advId
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

	var htmlStr = "document.write('<div>";
	var name = $.trim($("#ggwTitle").val());
	var id=$("#id").val();
	var adId=$("#adId").val();
	if (name == "") {
		layer.tips('请输入广告位名', "#ggwTitle", {
			tips: [1, 'red'],
			time: 3000
		});
		return;
	}
	var advId=$("#xzgg tr").eq(1).attr('data-id');
	var html = $.trim($("#xzgg tr").eq(1).children('td').eq(2).children('.html').text());
	htmlStr+=html;
	htmlStr +="</div>');";
	htmlStr = htmlStr.replace(/\n/g, '').replace(/\r/g, '');
	if ($("#xzgg tr:gt(0)").length==0) {
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
				advId: advId
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
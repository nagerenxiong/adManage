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
function page_(currentPage) {
	$.getJSON('/index/'+currentPage, {
		page: currentPage || 1
	}, function(res) {

		console.log(res);
		//显示分页
		var list=res.list;
		// $("#listgg tr:gt(0)").remove();
		for (var i = 0; i < list.length; i++) {
			var htmlStr='<tr data-id="'+list[i]["id"]+'" data-catid="'+list[i]["catId"]+'">\
                            <td class="ui-widget-content tc">\
                                <button type="button" class="button selectgg ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text">\
                                    <span class="ui-button-text">选择</span>\
                                </span></button>\
                            </td>\
                            <td class="ui-widget-content tc">\
                                '+list[i]["id"]+'</td>\
                            <td class="ui-widget-content plr">\
                                '+list[i]["html"]+'\
                            </td>\
                            <td class="ui-widget-content plr">\
                                    '+list[i]["catName"]+'\
                            </td>\
                            <td class="ui-widget-content plr" style="text-align:center">\
                                   '+list[i]["time"]+'\
                            </td>\
                        </tr>';
			$(".categoryTable").append(htmlStr);
		}
		laypage({
			cont: 'pagination', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
			pages: res.pages, //通过后台拿到的总页数
			curr: currentPage || 1, //当前页
			// skip: true, //是否开启跳页
			skin: '#AF0000',
			jump: function(obj, first) { //触发分页后的回调
				if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
					page_(obj.curr);
				}
			}
		});
	});
};
page_(1);
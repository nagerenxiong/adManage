$(".check_all").click(function() {
	if (!$(this).prop('checked')) {
		$(".check_id").prop('checked', false);
		$(this).prop('checked', false);
	} else {
		$(".check_id").prop('checked', true);
		$(this).prop('checked', true);
	}
})
$("#del_gg").click(function() {
	var idList = [];
	$(".check_id").each(function(index, el) {
		if ($(this).prop('checked'))
			idList.push($(this).val());
	})
	debugger;
	$.ajax({
			url: '/api/deleteAdv',
			type: 'post',
			data: {
				idList: idList
			}
		})
		.done(function(result) {
			console.log(result);
			if (result.serverStatus == 2) {
				$(".check_id").each(function(index, el) {
					for (var i = 0; i < idList.length; i++) {
						if ($(el).val() == idList[i])
							$(el).parent().parent().remove();
					}
				})
				layer.msg('删除分类成功');
			} else {
				layer.msg('删除分类失败');
			}
		})
		.fail(function() {
			layer.msg('删除分类失败');
		})
})

function page_(currentPage) {
	$.getJSON('/index/'+currentPage, {
		page: currentPage || 1
	}, function(res) {

		console.log(res);
		//显示分页
		var list=res.list;
		$(".categoryTable tr:gt(0)").remove();
		for (var i = 0; i < list.length; i++) {
			var htmlStr='<tr>\
					<td class="ui-widget-content tc">\
						<input type="checkbox" class="check_id" value="'+list[i]["id"]+'"></td>\
					<td class="ui-widget-content plr category_name">'+list[i]["name"]+'</td>\
					<td class="ui-widget-content tc">\
                        <a href="/editAd/'+list[i]['id']+'" title="">修改</a>\
                    </td>\
					<td class="ui-widget-content tc">\
						'+list[i]["catName"]+'\
					</td>\
					<td class="ui-widget-content tc">\
						<span title="创建于'+list[i]["time"]+'">'+list[i]["time"]+'</span>\
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
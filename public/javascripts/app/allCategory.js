$(".categoryTable").on('click', '.updateCategory', function() {
	var categoryDom = $(this).parent().prev();
	var timeDom = $(this).parent().next();
	var categoryName = categoryDom.text();
	var id = $(this).parent().prev().prev().children().val();
	layer.open({
		type: 1,
		skin: 'categoryLayer', //加上边框
		area: ['420px', '240px'], //宽高
		content: '<div class="categoryNameBox"><input type="text" value="' + categoryName + '" id="categoryName" placeholder="请输入分类名称" /><p><button type="button" class="button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-hover" id="submit" role="button"><span class="ui-button-text"><span class="ui-button-text"> 完 成 </span></span></button></p></div>'
	});
	$("#categoryName").focus();
	$("#submit").click(function() {
		var categoryName_txt = $.trim($("#categoryName").val());
		if (categoryName_txt == categoryName) {
			layer.tips('修改分类名称没变', '#submit', {
				tips: [1, 'red'],
				time: 3000
			});
			return;
		}
		$.ajax({
				url: '/api/updateCategory',
				type: 'post',
				data: {
					name: categoryName_txt,
					id: id
				}
			})
			.done(function(result) {
				if (result.affectedRows == 1) {
					categoryDom.text(categoryName_txt);
					timeDom.text(result.time);
					console.log(timeDom[0]);
					layer.tips('修改分类成功', '#submit', {
						tips: [1, '#3595CC'],
						time: 3000
					});
				} else {
					layer.tips('修改分类失败', '#submit', {
						tips: [1, 'red'],
						time: 3000
					});
				}
			})
			.fail(function() {
				layer.tips('修改分类失败', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
			})
	})
})
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
	$.ajax({
			url: '/api/deleteCategory',
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
						if ($(el).val()==idList[i])
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
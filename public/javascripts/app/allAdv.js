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
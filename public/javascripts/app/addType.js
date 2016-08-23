$("#submit").click(function() {
	var name = $.trim($("#name").val());
	if (name == "") {
		layer.tips('请输入类型名称', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
		return;
	}
	$.ajax({
		url: '/api/addType',
		type: 'post',
		data: {
			name: name,
			html:$("#html").val(),
			js:$("#js").val()
		},
		success: function(result) {
			if (result.affectedRows== 1) {
				layer.tips('添加类型成功', '#submit', {
					tips: [1, '#3595CC'],
					time: 3000
				});
				$("#name").val('').focus();
			}else if(result=="2")
			{
				layer.tips('已经存在的类型', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
			}
			else  {
				layer.tips('添加类型失败', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
			}
		}
	})
})
$("#submit").click(function() {
	var type=1;
	if($("#catType").prop('checked')){
		type=2;
	}
	var name = $.trim($("#name").val());
	if (name == "") {
		layer.tips('请输入类名', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
		return;
	}
	$.ajax({
		url: '/api/addCategory',
		type: 'post',
		async:false,
		data: {
			name: name,
			type:type
		},
		success: function(result) {
			if (result.affectedRows== 1) {
				layer.tips('添加分类成功', '#submit', {
					tips: [1, '#3595CC'],
					time: 3000
				});
				$("#name").val('').focus();
			}else if(result=="2")
			{
				layer.tips('已经存在的分类', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
			}
			else  {
				layer.tips('添加分类失败', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
			}
		}
	})
})
$("#catType").click(function(){
	if($(this).prop('checked'))
	{
		$("#label").text('新建广告位分类');
	}
	else{
		$("#label").text('新建广告分类');
	}
})
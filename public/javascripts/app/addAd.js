$("#submit").click(function() {
	var catId=$("#ggLei").val();
	var name = $.trim($("#name").val());
	if (name == "") {
		layer.tips('请输入广告名称', '#submit', {
					tips: [1, 'red'],
					time: 3000
				});
		return;
	}
	$.ajax({
		url: '/api/addAd',
		type: 'post',
		data: {
			name: name,
			html:$("#html").val(),
			js:$("#js").val(),
			css:$("#css").val(),
			boxId:$("#boxId").attr('data-boxId'),
			catId:catId
		},
		success: function(result) {
			if (result.affectedRows== 1) {
				layer.tips('添加类型成功', '#submit', {
					tips: [1, '#3595CC'],
					time: 3000
				});
				setTimeout(function(){
				window.location.reload();
				},3500)
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
$("#imgGG").click(function(){
	layer.open({
	  type: 1,
	  skin: 'layui-layer-demo', //样式类名
	  shift: 2,
	  area: ['600px', '600px'],
	  shadeClose: true, //开启遮罩关闭
	  content: $('#photoDialog')
	});
})
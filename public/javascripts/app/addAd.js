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
	  shift: 2,
	  area: ['560px', '520px'],
	  shadeClose: true, //开启遮罩关闭
	  content: $('#photoDialog')
	});
})
$("#textGG").click(function(){
	layer.open({
	  type: 1,
	  shift: 2,
	  area: ['430px', '430px'],
	  shadeClose: true, //开启遮罩关闭
	  content: $('#fontDialog')
	});
})
$("#generateCode").click(function(){
	var imgUrl=$("#imgUrl").val();
	if(imgUrl=="")
		return;
	var imgW=$("#imgW").val();
	var imgH=$("#imgH").val();
	var imgAlt=$("#imgAlt").val();
	var imgLink=$("#imgLink").val();
	var imgTag=$("#imgTag1").prop('checked');
	var imgTar="";
	if(imgTag)
		imgTar="_blank"
	else
		imgTar="_self";
	var html='<a href="'+imgLink+'" target="'+imgTar+'"><img src="'+imgUrl+'" alt="'+imgAlt+'" border="0" width="'+imgW+'" height="'+imgH+'" /></a>'
	$("#html").val($("#html").val()+html);
	layer.closeAll();
})
$("#generateCode1").click(function(){
	var textContent=$("#textContent").val();
	var textLink=$("#textLink").val();
	var fontSize=$("#textSize").val();
	var textTag=$("#textTag1").prop('checked');
	var textTar="";
	if(textTag)
		textTar="_blank"
	else
		textTar="_self";
	//<a href="http://asdfasdf " target="_self" style="font-size: 1px;">asdfasdfasdf</a>
	var html='<a href="'+textLink+'" target="'+textTar+'" style="font-size:'+fontSize+'px;">'+textContent+'</a>';
	$("#html").val($("#html").val()+html);
	layer.closeAll();
})
$(".closeBtn").click(function(){
	layer.closeAll();
})
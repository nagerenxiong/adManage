$(".getCodeBtn").click(function() {
	var adId=$(this).attr('data-adId');
	$("#tipTxt").val('<script src="http://127.0.0.1/javascripts/ads/ad'+adId+'.js"></script>');
	layer.open({
		type: 1,
		skin: 'layui-layer-rim', //加上边框
		area: ['420px', '200px'], //宽高
		title:false,
		content:$("#tip")
	});
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
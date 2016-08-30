$(".categoryTable").on('click','.getCodeBtn',function(){
	var adId=$(this).attr('data-adId');
	$("#tipTxt").val('<script src="http://192.168.1.74:3001/javascripts/ads/ad'+adId+'.js"></script>');
	layer.open({
		type: 1,
		skin: 'layui-layer-rim', //加上边框
		area: ['460px', '200px'], //宽高
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
function page_(currentPage) {
	$.getJSON('/allAdBox/page/'+currentPage, {
		page: currentPage || 1
	}, function(res) {
		console.log(res);
		//显示分页
		var list=res.list;
		$(".categoryTable tr:gt(0)").remove();
		for (var i = 0; i < list.length; i++) {
			var htmlStr='<tr data-id="'+list[i]['id']+'">\
                    <td class="ui-widget-content tc">\
                        <input type="checkbox" class="check_id" value="'+list[i]['id']+'" data-adId="'+list[i]['adId']+'"></td>\
                    <td class="ui-widget-content plr category_name">'+list[i]['name']+'</td>\
                    <td class="ui-widget-content tc">\
                        <a href="/editAdBox/'+list[i]['id']+'" title="">修改</a>\
                    </td>\
                    <td class="ui-widget-content tc">\
                        '+list[i]['catName']+'\
                    </td>\
                    <td class="ui-widget-content tc">\
                        <a href="javascript:void(0)" class="getCodeBtn" data-adid="'+list[i]['adId']+'">获取代码</a>\
                    </td>\
                    <td class="ui-widget-content tc">\
                        '+list[i]['time']+'\
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
$("#del_gg").click(function() {
	var idList = [];
	var adIdList=[];
	$(".check_id").each(function(index, el) {
		if ($(this).prop('checked')){
			idList.push($(this).val());
			adIdList.push($(this).attr('data-adid'));
		}
	})
	$.ajax({
			url: '/api/deleteAdBox',
			type: 'post',
			data: {
				idList: idList,
				adIdList:adIdList
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
				layer.msg('删除广告位成功');
			} else {
				layer.msg('删除广告位失败');
			}
		})
		.fail(function() {
			layer.msg('删除广告位失败');
		})
})

顶顶顶顶顶顶顶顶顶顶顶爱的色放
啊手动阀手动阀
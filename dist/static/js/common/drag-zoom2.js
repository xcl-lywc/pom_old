var moveFlag = false;
var dragFlag = false;
var DIVListData;      //控制DIV列表显示信息的数据

var curMoveDIV;       //当前拖拉目标的DIV
var curMoveDIVWidth;  //当前拖拉目标的DIV的宽度

var startDivId;    //拖拽 开始的DIV
var endDivId;      //拖拽 结束的DIV

var moveBefore;       //当前目标移动之前的数据
var moveAfter;        //当前目标移动之后的数据
function initAction (callback) {

	//读取存储的位置信息
	$.ajax({
		type: "GET",
		url: basePath + "/record/records",
		async: false,
		success: function (response) {
			DIVListData = response.data;
			//debugger
			$.each(response.data, function(index, item) {
				//遍历设置DIV的顺序
				$(".drag-area").append($("#" + item.name));
				//遍历设置DIV的宽度
				if (item.width > ($(window).width() - 40)) {
					$("#"+ item.name).width($(window).width() - 40)
				} else {
					$("#"+ item.name).width(item.width)
				}
			});
			if (callback) {
				callback(DIVListData);
			}
		},
		error: function (error) {
			commonFunction.showText(error)
		}
	})

	function isMoreLink(element) {
		return element && $(element).hasClass("js-more-info");
	}
	//拖拉事件 - 开始
	$("body").on("mousedown", ".drag-bar", function (event) {
		moveFlag = true;
		//记录开始拖动前的div位置
		moveBefore = event.pageX
		curMoveDIV = $(event.target).parents().filter(".nx-table-panel");
		curMoveDIVWidth = curMoveDIV.width();
		curMoveDIV.css({"box-shadow": "0 0 15px rgba(66, 125, 209, 0.6)"})
	});
	//拖拽事件 - 开始
	$("body").on("mousedown", ".panel-wrap h5", function (event) {
		if (!isMoreLink(event.target)) {
			dragFlag = true;
			//设置拖拽开始的位置Id
			startDivId = $(event.target).parents().filter(".nx-table-panel").attr("id")
		} else {
			var location = window.location.href
			if($(event.target).hasClass("test-manage")){
				var url = location.replace(/home\/dashboard/g, "test_manage")
			}
			if($(event.target).hasClass("product-manage")){
				var url = location.replace(/home\/dashboard/g, "product_manage")
			}
			if($(event.target).hasClass("mission-manage")){
				var url = location.replace(/home\/dashboard/g, "project_manage/project")
			}
			if($(event.target).hasClass("project-manage")){
				var url = location.replace(/home\/dashboard/g, "project_manage")
			}
			window.location.href = url
		}
	});

	$(document).on("mousemove", function (event) {
		if( moveFlag ) {
			moveAfter = event.pageX;
			var tagetWidth = curMoveDIVWidth + (moveAfter - moveBefore) //将变换的宽度,需减去拖动区域条的宽
			//宽度限制
			if(tagetWidth > $(window).width() - 40) {
				tagetWidth = $(window).width() - 40
			}
			if(tagetWidth < 300) {
				tagetWidth = 300
			}
			//设置宽度
			curMoveDIV.css({"width": tagetWidth})
		}
		if( dragFlag ) {
			$(document).css({"cursor": "all-scroll!important"})
		}
	}).on("mouseup", function (event) {
		//拖拉的动作执行
		if( moveFlag ) {
			var submitData = []
			//遍历写入目前的排序以及宽度信息
			for(var index = 0; index < 6; index++) {

				submitData.push({
					name: $(".nx-table-panel").eq(index)[0].id,
					width: $(".nx-table-panel").eq(index).width(),
				})
			}
			//提交需要保存的数据
			$.ajax({
				type: "POST",
				url: basePath + "/record/operate",
				traditional: true,
				data: { record: JSON.stringify(submitData)  },
				success: function (response) {
					if (response.meta.code != 1) {
						showText(response.meta.message, true)
					}
				},
				error: function (error) {
					showText(error, true)
				}
			})
			moveFlag = false;
		}
				
		$(document).css({"cursor": "auto!important"})
		$(".nx-table-panel").css({"box-shadow": "0 0 15px rgba(66, 125, 209, 0.3)"})
		

		//拖拽动作执行
		if (dragFlag) {

			var panelArray = []
			$.each($("body").find(".nx-table-panel"), function (index, item) {
				panelArray.push(item.id)
			})
			//设置拖拽结束的位置Id
			endDivId = $(event.target).parents().filter(".nx-table-panel").attr("id"); //鼠标离开的目标DIV
			//若不在DIV上离开鼠标事件,则不执行事件
			if( endDivId ){
				// 根据目前的数组判断正向还是反向拖动
				if(panelArray.indexOf(endDivId) < panelArray.indexOf(startDivId)) {
					var tempHTML = $("body").find("#"+startDivId).prop("outerHTML");
					$("body").find("#"+startDivId).replaceWith($("body").find("#"+endDivId).prop("outerHTML"));
					$("body").find("#"+endDivId).replaceWith(tempHTML);
				} else {
					var tempHTML = $("body").find("#"+endDivId).prop("outerHTML");
					$("body").find("#"+endDivId).replaceWith($("body").find("#"+startDivId).prop("outerHTML"));
					$("body").find("#"+startDivId).replaceWith(tempHTML);
				}
				var submitData = []
				//遍历写入目前的排序以及宽度信息
				for(var index = 0; index < 6; index++) {

					submitData.push({
						name: $(".nx-table-panel").eq(index)[0].id,
						width: $(".nx-table-panel").eq(index).width(),
					})
				}
				//提交需要保存的数据
				$.ajax({
					type: "POST",
					url: basePath + "/record/operate",
					traditional: true,
					data: { record: JSON.stringify(submitData)  },
					success: function (response) {
						if (response.meta.code != 1) {
							showText(response.meta.message, true)
						}
					},
					error: function (error) {
						showText(error, true)
					}
				})
			}
			
			//初始化暂时的数据
			startDIvId = null;
			endDivId   = null;
			dragFlag   = false;
		}
	});
}

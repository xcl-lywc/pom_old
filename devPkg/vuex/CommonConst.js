/*********************************************************************
 * Created by deming-su on 2017/8/25                                 *
 *********************************************************************/

/*******************************首页数据变量 start*****************************/
// 导航栏数据
export const SIDE_NAV_DATA = "SIDE_NAV_DATA";
/*******************************首页数据变量 end*****************************/

/*******************************首页数据请求URL start*****************************/
// 侧导航数据接口
export const SIDE_NAV_URL = '/navigator/sidenav.json';
/*******************************首页数据请求URL end*****************************/
/**
 * 定义方法
 * {{getUrl：Function 获取url方法}}
 * getUrl：(urlObj:{url: 'string',params:'string'})
 */

export const getUrl = function(urlObj) {
	let url = urlObj.url;
	let reg = /\{.*?\}/g;
	const urlStart = url.endsWith('.json') ? "../mokeData" : 'your project address';
	/* 匹配请求路径中的参数 */
	let urlParams = url.match(reg);
	/* 匹配字符串，判断字符串是否包含{}字样 */
	if (urlParams) {
		let paramsArray = urlObj.params.split(',');
		/* 遍历匹配数组 */
		urlParams.map((it, i) => {
			url = url.replace(it, paramsArray[i]);
		});
	}
	return urlStart + url;
};

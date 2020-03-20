import vue from 'vue';
const Vue = new vue();

export default {
	/**
	 * axios请求方法
	 * @param {String} method 请求方式
	 * @param {String} url 请求地址
	 * @param {Object} params 请求参数
	 * @param {Object} success 请求成功回调函数
	 * @param {Object} fail 请求失败回调函数
	 * @param {String} message 提示信息
	 * @param {String} responseType 这个参数只适用于post方法，因为post要单独接收
	 */
	requestAxios(method,url, params,success,fail,responseType, message, contentType) {
		// ---------------------------- 添加token请求头，提供给后台判断，避免重复登录 -----------------------------
		if(sessionStorage.getItem('userData')){
			Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(sessionStorage.getItem('userData')).token;
		}
		
		Vue.axios[method](url,params,responseType,contentType).then(function (response) {
	    	if(response.data.hasOwnProperty('meta')){// ---- 当包含meta字段时，返回的数据就不是文件流，就需要做进一步的判断

	    		if(response.data.meta.code === 401){// ------ 当code为401时，表示未登录
	    			Vue.$message({message: response.data.meta.message, type: 'warning', duration: 1500});
		    		setTimeout(function(){
		    			window.location.href = '/#/login';
		    		},1510);
		    		// -------------- 清除 -------------
		    		sessionStorage.removeItem("typeName");
			        sessionStorage.removeItem("typeId");
			        sessionStorage.removeItem("userData");
	    			Vue.$store.state.socket ? Vue.$store.state.socket.close() : '';
	    			Vue.$store.state.isLoginOut = true;
	    		}else if(response.data.meta.code == 0){ //当code为0时数据，表示获取后台的数据成功，返回后台数据
	    		
	    			success(response);
	    		}else { //否者，返回错误信息
	    		
	    			fail(response, '200');
	    		}
	    	
	    	}else{ // 直接返回文件流数据
		  
		    	success(response);
		    }
		}).catch(function (error) { 
		    fail(error, '404');
		});
	},
};

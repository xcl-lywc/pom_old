/*********************************************************************
 * Created by sudeming on 2017/7/25                                  *
 * 通用模块--Vuex                                                      *
 *********************************************************************/

import * as common from '../CommonConst'
import axios from 'axios'

const state = {
	sideNavData: []
};

const getters = {
	sideNavData: state => state.sideNavData
};

const actions = {
	getSideNavData({commit}) {
		axios.get(common.getUrl({url: common.SIDE_NAV_URL}))
			.then(resData => {
				const data = resData.data;
				if (data && data.meta && data.meta.code * 1 === 1) {
					commit(common.SIDE_NAV_DATA, {resData: data.data});
				} else {
					commit(common.SIDE_NAV_DATA, {resData: []});
				}
			})
			.catch(e => {
				commit(common.SIDE_NAV_DATA, {resData: []});
			});
	}
};

const mutations = {
	[common.SIDE_NAV_DATA](state, {resData}) {
		state.sideNavData = resData;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
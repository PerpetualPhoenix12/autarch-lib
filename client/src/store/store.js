import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		novels: {'reading': [], 'paused': [], 'completed': [], 'dropped': [], 'planned': []},
		uid: null,
		isMobile: null,
		isBottomNav: null
	},
	getters: {
		filterList: state => status => state.novels[status],
		fetchNovel: state => id => {
			let found = false;
			for (let status in state.novels) {
				state.novels[status].forEach(novel => {
					if (novel.id == id) {
						found = novel;
						return false;
					}
				});
			}
			return !found ? -1 : found
		},
		isAuth: state => state.uid ? true : false,
		isMobile: state => state.isMobile,
		isBottomNav: state => state.isBottomNav
	},
	mutations: {
		add: (state, payload) => {
			const status = payload.doc.data().status;
			state.novels[status].push({
				...payload.doc.data(),
				id: payload.doc.id
			})
		},
		modify: (state, payload) => {
			const status = payload.doc.data().status;
			const index = state.novels[status].findIndex(item => item.id === payload.doc.id);
			state.novels[status][index] = payload.doc.data();
		},
		clear: state => state.novels = {'reading': [], 'paused': [], 'completed': [], 'dropped': [], 'planned': []},
		setUID: (state, uid) => state.uid = uid,
		setMobile: (state, isMobile) => state.isMobile = isMobile,
		setBottomNav: (state, isBottomNav) => state.isBottomNav = isBottomNav 
	}
});	

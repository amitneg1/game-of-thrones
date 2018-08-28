import Vue from 'vue'
import Vuex from 'vuex'

import httpService from '@/services/http-common.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allbooks: [],
    loading: false,
    books: [],
    pageNo: 1,
    pageSize: 10,
    startLimitReached: true,
    endLimitReached: false
  },
  getters: {
    books: (state) => {
      return state.books;
    },
    showLoading: (state) => {
      return state.loading;
    },
    pageNo: (state) => {
      return state.pageNo;
    },
    startLimitReached: (state) => {
      return state.startLimitReached;
    },
    endLimitReached: (state) => {
      return state.endLimitReached;
    },
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status;
    },
    setData (state, data) {
      state.allbooks = data;
      state.books = state.allbooks;
    },
    toggleStartLimit (state, status) {
      state.startLimitReached = status;
    },
    toggleEndLimit (state, status) {
      state.endLimitReached = status;
    }
  },
  actions: {
    filterBooksByName ({state}, payload) {
      state.books = state.allbooks.filter((book) => {
       return (book.name.toLowerCase().indexOf(payload.query) !== -1);
      });
    },
    filterBooksByAuthor ({state}, payload) {
      state.books = state.allbooks.filter((book) => {
       return (book.authors[0].toLowerCase().indexOf(payload.query) !== -1);
      });
    },
    getAllBooks ({state, commit}) {
      if (!state.loading) {
        commit('setLoading', true);
        httpService.getBooks(state.pageNo, state.pageSize).then(response => {
          response.data = response.data.sort(function(a, b) {
              return a.name > b.name;
          });
          commit('setData', response.data);
          if(!response.data || response.data.length < state.pageSize) {
            commit('toggleEndLimit', true);
          }
        })
        .finally(() => {
          commit('setLoading', false);
        });
      }
    },
    loadPreviousPage ({state, commit, dispatch}) {
      if(state.startLimitReached)
        return;
      else
      {
        commit('toggleEndLimit', false);
        state.pageNo--;
        dispatch('getAllBooks');
        if(state.pageNo === 1) {
          commit('toggleStartLimit', true);
        }
      }
    },
    loadNextPage ({state, commit, dispatch}) {
      if(state.endLimitReached)
        return;
      else
      {
        commit('toggleStartLimit', false);
        state.pageNo++;
        dispatch('getAllBooks');
      }
    }
  }
});

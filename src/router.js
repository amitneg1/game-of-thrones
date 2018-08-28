import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Home.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('./components/books/Books.vue')
    },
    {
      path: '/books/:id',
      name: 'bookdetail',
      component: () => import('./components/books/BookDetail.vue')
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('./components/characters/Characters.vue')
    },
    {
      path: '/characters/:id',
      name: 'characterdetail',
      component: () => import('./components/characters/CharacterDetail.vue')
    },
    {
      path: '/houses',
      name: 'houses',
      component: () => import('./components/houses/Houses.vue')
    },
    {
      path: '/houses/:id',
      name: 'housedetail',
      component: () => import('./components/houses/HouseDetail.vue')
    },
  ]
})

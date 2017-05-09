import Vue from 'vue'
import Router from 'vue-router'

import home from 'components/home/home'
// import technology from 'components/technology/technology'
// import life from 'components/life/life'
// import aboutme from 'components/aboutme/aboutme'
// import contact from 'components/contact/contact'
// import article from 'components/article/article'
// import search from 'components/search/search'
// import notfound from 'components/notfound/notfound'

// 异步组件获取
const technology = () => System.import('components/technology/technology.vue')
const life = () => System.import('components/life/life.vue')
const aboutme = () => System.import('components/aboutme/aboutme.vue')
const contact = () => System.import('components/contact/contact.vue')
const article = () => System.import('components/article/article.vue')
const search = () => System.import('components/search/search.vue')
const notfound = () => System.import('components/notfound/notfound.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/technology',
      name: 'technology',
      component: technology
    },
    {
      path: '/life',
      name: 'life',
      component: life
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: aboutme
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '*',
      component: notfound
    }
  ],
  transitionOnLoad: false,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

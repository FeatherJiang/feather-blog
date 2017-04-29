import Vue from 'vue'
import Router from 'vue-router'

import home from 'components/home/home'
import technology from 'components/technology/technology'
import life from 'components/life/life'
import aboutme from 'components/aboutme/aboutme'
import contact from 'components/contact/contact'
import article from 'components/article/article'
import search from 'components/search/search'
import notfound from 'components/notfound/notfound'

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

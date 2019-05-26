import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Name = name => () => import(`@/views/devices/${name}`)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/device1',
      name: 'device1',
      component: Name('device1')
    },
    {
      path: '/device2',
      name: 'device2',
      component: Name('device2')
    },
    {
      path: '/device6',
      name: 'device6',
      component: Name('device6')
    },
    {
      path: '/device7',
      name: 'device7',
      component: Name('device7')
    },
    {
      path: '/device8',
      name: 'device8',
      component: Name('device8')
    },
    {
      path: '/device10',
      name: 'device10',
      component: Name('device10')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Type from './views/Type.vue'
import Brands from './views/Brands'
import Match from './views/Match'
import operator from './views/STB_Operator'
const Name = name => () => import(`@/views/devices/${name}`)

const Setting = () => import('@/views/Setting.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/type',
      name: 'type',
      component: Type
    },
    {
      path: '/brands',
      name: 'brands',
      component: Brands
    },
    {
      path: '/operator',
      name: 'operator',
      component: operator
    },
    {
      path: '/match',
      name: 'Match',
      component: Match
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
    },
    {
      path: '/device40',
      name: 'device40',
      component: Name('device40')
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    }
  ]
})

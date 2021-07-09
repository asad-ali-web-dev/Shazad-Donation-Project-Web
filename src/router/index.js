import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Donations from '../pages/Donations.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/donations', name: 'Donations', component: Donations }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
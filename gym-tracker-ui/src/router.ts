import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import NotFoundView from './views/NotFoundView.vue'
import Layout from './components/Layout.vue'
import AboutView from './views/AboutView.vue'
const routes = [
    { path: '/', redirect: { name: 'home' }, name: 'root' },
    { path: '/login', component: LoginView, name: 'login' },
    {
        path: '/app',
        component: Layout,
        redirect: { name: 'home' },
        children: [
            { path: 'home', component: HomeView, name: 'home' },
            { path: 'about', component: AboutView, name: 'about' },
        ],
    },
    { path: '/:pathMatch(.*)', component: NotFoundView },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

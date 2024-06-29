import { createWebHashHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import Layout from './components/Layout.vue'
import WorkoutsPage from './pages/WorkoutsPage.vue'
const routes = [
    { path: '/', redirect: { name: 'home' }, name: 'root' },
    { path: '/login', component: LoginPage, name: 'login' },
    {
        path: '/app',
        component: Layout,
        redirect: { name: 'home' },
        children: [
            { path: 'home', component: HomePage, name: 'home' },
            { path: 'about', component: WorkoutsPage, name: 'workouts' },
        ],
    },
    { path: '/:pathMatch(.*)', component: NotFoundPage },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

import { createWebHashHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import Layout from './components/Layout.vue'
import WorkoutPage from './pages/WorkoutPage.vue'
import ExercisePage from './pages/ExercisePage.vue'
const routes = [
    { path: '/', redirect: { name: 'home' }, name: 'root' },
    { path: '/login', component: LoginPage, name: 'login' },
    {
        path: '/app',
        component: Layout,
        redirect: { name: 'home' },
        children: [
            { path: 'home', component: HomePage, name: 'home' },
            { path: 'workouts/:workoutId', component: WorkoutPage, name: 'workout' },
            { path: 'workouts/:workoutId/exercises/:exerciseId', component: ExercisePage, name: 'exercise' },
        ],
    },
    { path: '/:pathMatch(.*)', component: NotFoundPage },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

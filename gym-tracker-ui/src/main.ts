import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css'
import setupVant from './importVantComponents'
import router from './router'
import { Auth0VueClient, createAuth0 } from '@auth0/auth0-vue'
import createApiFetch from './lib/createApiFetch'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

setupVant(app)
app.use(router)
app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH_DOMAIN,
        clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
        cacheLocation: 'localstorage',

        authorizationParams: {
            redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
            audience: import.meta.env.VITE_AUTH_AUDIENCE,
        },
    }),
)

const auth0 = app.config.globalProperties['$auth0'] as Auth0VueClient

export const useApiFetch = createApiFetch(
    import.meta.env.VITE_API_BASE_URL,
    async () => {
        return await auth0.getAccessTokenSilently()
    },
    async () => {
        await auth0.logout()
    },
)

app.mount('#app')

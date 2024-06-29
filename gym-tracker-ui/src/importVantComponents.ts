import { ConfigProvider, Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import { App } from 'vue'

export default function setupVant(app: App<Element>) {
    Locale.use('en-US', enUS)
    app.use(ConfigProvider)
}
